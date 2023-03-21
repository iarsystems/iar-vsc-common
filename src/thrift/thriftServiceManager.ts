/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import * as Thrift from "thrift";
import * as Path from "path";
import * as Fs from "fs";
import * as Os from "os";
import { Protocol, ServiceLocation, Transport } from "./bindings/ServiceRegistry_types";
import { ChildProcess, spawn } from "child_process";
import { ThriftClient } from "./thriftClient";
import { v4 as uuidv4 } from "uuid";
import * as CSpyServiceRegistry from "./bindings/CSpyServiceRegistry";
import { AddressInfo, Server } from "net";

/** Callback for when the service manager crashes */
type CrashHandler = (exitCode: number | null) => void;
export interface ProcessMonitor {
    stdout: (data: string) => void;
    stderr: (data: string) => void;
    exit:   (code: number | null) => void;
}

/**
 * Provides and manages thrift services for a workbench, by launching and connecting to a service registry.
 * Since there are multiple ways of launching a service registry (i.e. iarservicelauncher and cspyserver),
 * this class attempts to be generic enough to support all of them.
 */
export class ThriftServiceManager {
    private static readonly SERVICE_LOOKUP_TIMEOUT = 1000;
    private static readonly PROCESS_LAUNCH_TIMEOUT = 20000;
    private static readonly PROCESS_EXIT_TIMEOUT = 15000;
    private crashHandlers: CrashHandler[] = [];
    private readonly activeServers: Server[] = [];

    /**
     * Create a new service manager by launching the given process with the given arguments,
     * and waiting for the given service to become available.
     * @param execPath Path to the executable to launch.
     * @param args Arguments to launch the executable with.
     * @param stopProcess Function to call when shuttdownnn down the registry. This should cause the process to exit *eventually*,
     *  but does not need to kill it right away.
     * @param serviceToAwait The name of a service to wait for after starting, to make sure everying is started.
     * @param procMon Receives information about the registry process that may be useful to log.
     */
    public static launch(execPath: string, args: string[], stopProcess: (mngr: ThriftServiceManager) => Promise<void>, serviceToAwait?: string, procMon?: ProcessMonitor): Promise<ThriftServiceManager> {
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
                resolve(new ThriftServiceManager(process, location, stopProcess));
            });
        });
    }

    private constructor(private readonly process: ChildProcess, private readonly registryLocation: ServiceLocation, private readonly stopProcess: (mngr: ThriftServiceManager) => Promise<void>) {
        process.once("exit", code => {
            this.crashHandlers.forEach(handler => handler(code));
        });
    }

    public async dispose() {
        // Prevent crash handlers from being called from an expected exit.
        this.crashHandlers = [];

        await this.stopProcess(this);
        this.activeServers.forEach(server => server.close());

        // Wait for service registry process to exit
        if (this.process.exitCode === null) {
            await new Promise<void>(resolve => {
                this.process.on("exit", resolve);
                setTimeout(() => {
                    resolve();
                    this.process.kill();
                }, ThriftServiceManager.PROCESS_EXIT_TIMEOUT);
            });
        }
    }

    /**
     * Registers a handler to run when the service manager process exits unexpectedly.
     */
    public addCrashHandler(handler: CrashHandler) {
        this.crashHandlers.push(handler);
    }

    /**
     * Connects to a service with the given name. The service must already be started
     * (or in the process of starting), otherwise this method will reject.
     * @param serviceId The name to give the service
     * @param serviceType The type of the service with the given name (usually the top-level import of the service module)
     */
    public async findService<T>(serviceId: string, serviceType: Thrift.TClientConstructor<T>): Promise<ThriftClient<T>> {
        const registry = await ThriftClient.connect(this.registryLocation, CSpyServiceRegistry);

        const location = await registry.service.waitForService(serviceId, ThriftServiceManager.SERVICE_LOOKUP_TIMEOUT);
        const service = await ThriftClient.connect(location, serviceType);

        registry.close();

        return service;
    }

    /**
     * Start and register a new service in this service registry.
     * @param serviceId The name to give the service
     * @param serviceType The type of service to register (usually given as the top-level import of the service module)
     * @param handler The handler implementing the service
     * @typeParam Pr The processor type for the service, usually serviceType.Processor
     * @typeParam Ha The handler type for the service, usually object (thrift doesn't provide typescript types for service handlers)
     */
    async startService<Pr, Ha>(serviceId: string, serviceType: Thrift.TProcessorConstructor<Pr, Ha>, handler: Ha): Promise<ServiceLocation> {
        const serverOpt = {
            transport: Thrift.TBufferedTransport,
            protocol: Thrift.TBinaryProtocol,
        };
        const server = Thrift.createServer(serviceType, handler, serverOpt).
            on("error", e => console.error(`Error in thrift server '${serviceId}': ${e.toString()}`)).
            listen(0); // port 0 lets node figure out what to use

        const port = (server.address() as AddressInfo).port; // this cast is safe since we know it's an IP socket
        const location = new ServiceLocation({ host: "localhost", port: port, protocol: Protocol.Binary, transport: Transport.Socket });
        const registry = await ThriftClient.connect(this.registryLocation, CSpyServiceRegistry);
        await registry.service.registerService(serviceId, location);

        this.activeServers.push(server);

        registry.close();
        return location;
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