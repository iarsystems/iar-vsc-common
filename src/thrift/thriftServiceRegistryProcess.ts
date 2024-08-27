/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import * as Thrift from "thrift";
import * as Path from "path";
import * as Fs from "fs";
import * as Os from "os";
import { ServiceLocation } from "./bindings/ServiceRegistry_types";
import { ChildProcess, spawn } from "child_process";
import { ThriftClient } from "./thriftClient";
import { v4 as uuidv4 } from "uuid";
import * as CSpyServiceRegistry from "./bindings/CSpyServiceRegistry";
import { ThriftServiceRegistry } from "./thriftServiceRegistry";

/** Callback for when the service manager crashes */
type CrashHandler = (exitCode: number | null) => void;
export interface ProcessMonitor {
    stdout: (data: string) => void;
    stderr: (data: string) => void;
    exit:   (code: number | null) => void;
}

/**
 * This class helps launch and shut down proccesses (i.e. cspyserver or
 * iarservicelauncher) that provide a thrift service registry. The service
 * registry itself can be accessed via {@link serviceRegistry}.
 */
export class ThriftServiceRegistryProcess {
    readonly serviceRegistry: ThriftServiceRegistry;

    private static readonly PROCESS_LAUNCH_TIMEOUT = 20000;
    private static readonly PROCESS_EXIT_TIMEOUT = 15000;
    private crashHandlers: CrashHandler[] = [];

    /**
     * Create a new service manager by launching the given process with the given arguments,
     * and waiting for the given service to become available.
     * @param execPath Path to the executable to launch.
     * @param args Arguments to launch the executable with.
     * @param stopProcess Function to call when shutting down the registry. This should cause the process to exit *eventually*,
     *  but does not need to kill it right away.
     * @param serviceToAwait The name of a service to wait for after starting, to make sure everying is started.
     * @param procMon Receives information about the registry process that may be useful to log.
     */
    public static launch(
        execPath: string,
        args: string[],
        stopProcess: (mngr: ThriftServiceRegistry) => Promise<void>,
        serviceToAwait?: string,
        procMon?: ProcessMonitor): Promise<ThriftServiceRegistryProcess> {

        const tmpDir = getTmpDir();
        const expectedLocationFile = Path.join(tmpDir, "CSpyServer2-ServiceRegistry.txt");
        const locationPromise = waitForServiceRegistryLocationFile(expectedLocationFile);
        return new Promise((resolve, reject) => {
            const process = spawn(execPath, args, { cwd: tmpDir });
            process.stdout?.on("data", data => {
                procMon?.stdout(data.toString());
            });
            process.stderr?.on("data", data => {
                procMon?.stderr(data.toString());
            });
            process.on("exit", code => {
                procMon?.exit(code);
                reject(new Error("Service registry exited prematurely, code: " + code));
            });
            setTimeout(() => {
                reject(new Error("Service registry launch timed out"));
            }, this.PROCESS_LAUNCH_TIMEOUT);

            // First we wait for the service registry to be ready (when the location file has been created),
            // then optionally wait for some service to be registered in the registry
            locationPromise.then(async location => {
                if (serviceToAwait) await waitForServiceToBeOnline(location, serviceToAwait);
                resolve(new ThriftServiceRegistryProcess(location, process, stopProcess));
            });
        });
    }

    private constructor(
        registryLocation: ServiceLocation,
        private readonly process: ChildProcess,
        private readonly stopProcess: (mngr: ThriftServiceRegistry) => Promise<void>) {
        this.serviceRegistry = new ThriftServiceRegistry(registryLocation);

        process.once("exit", code => {
            this.crashHandlers.forEach(handler => handler(code));
        });
    }

    public async dispose() {
        // Prevent crash handlers from being called from an expected exit.
        this.crashHandlers = [];

        await this.stopProcess(this.serviceRegistry);
        this.serviceRegistry.dispose();

        // Wait for service registry process to exit
        if (this.process.exitCode === null) {
            await new Promise<void>(resolve => {
                this.process.on("exit", resolve);
                setTimeout(() => {
                    resolve();
                    this.process.kill();
                }, ThriftServiceRegistryProcess.PROCESS_EXIT_TIMEOUT);
            });
        }
    }

    /**
     * Registers a handler to run when the service manager process exits unexpectedly.
     */
    public addCrashHandler(handler: CrashHandler) {
        this.crashHandlers.push(handler);
    }
}

// Waits for a service registry location file to appear, then reads it.
function waitForServiceRegistryLocationFile(locationFilePath: string): Promise<ServiceLocation> {
    let resolved = false;
    return new Promise<ServiceLocation>(resolve => {
        // Start watching for the registry file
        Fs.watch(Path.dirname(locationFilePath), undefined, (type, fileName) => {
            // When the file has been created, read the location of the registry
            if (!resolved && (type === "rename") && fileName === Path.basename(locationFilePath)) {
                // Find the location of the service registry
                const locSerialized = Fs.readFileSync(locationFilePath);
                // These concats are a hack to create a valid thrift message. The thrift library seems unable to deserialize just a struct (at least for the json protocol)
                // Once could also do JSON.parse and manually convert it to a ServiceLocation, but this is arguably more robust
                const transport = new Thrift.TFramedTransport(Buffer.concat([Buffer.from("[1,0,0,0,"), locSerialized, Buffer.from("]")]));
                const prot = new Thrift.TJSONProtocol(transport);
                prot.readMessageBegin();
                const location = new ServiceLocation();
                location.read(prot);
                prot.readMessageEnd();

                resolved = true;
                resolve(location);
            }
        });
    });
}

// Polls the service registry for the desired service with exponential backoff.
async function waitForServiceToBeOnline(serviceRegistryLocation: ServiceLocation, serviceId: string): Promise<void> {
    const serviceRegistry = await ThriftClient.connect(serviceRegistryLocation, CSpyServiceRegistry);
    for (let i = 0; i < 10; i++) {
        try {
            await serviceRegistry.service.waitForService(serviceId, 1000);
            return Promise.resolve();
        } catch (e) {
            await new Promise((res, _) => setTimeout(res, i*100));
        }
    }
    return Promise.reject(new Error(`Failed to launch service registry: service '${serviceId}' did not start.`));
}

// Creates and returns a unique temporary directory.
// This is used to store the bootstrap file created by IarServiceLauncher, to avoid conflicts if
// several service launcher processes are run at the same time.
function getTmpDir(): string {
    // Generate a uuid-based name and place in /tmp or similar
    const tmpPath = Path.join(Os.tmpdir(), "iar-build", uuidv4());
    if (!Fs.existsSync(tmpPath)) {
        Fs.mkdirSync(tmpPath, {recursive: true});
    }
    return tmpPath;
}