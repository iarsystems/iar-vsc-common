/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import * as Thrift from "thrift";
import * as CSpyServiceRegistry from "./bindings/CSpyServiceRegistry";
import { Protocol, ServiceLocation, Transport } from "./bindings/ServiceRegistry_types";
import { AddressInfo, Server } from "net";
import { ThriftClient } from "./thriftClient";

/**
 * A wrapper around a remote thrift service registry launched by e.g. cspyserver
 * or iarservicelauncher. Allows registering and looking up thrift services.
 */
export class ThriftServiceRegistry {
    private static readonly SERVICE_LOOKUP_TIMEOUT = 1000;
    private readonly activeServers: Server[] = [];

    constructor(readonly registryLocation: ServiceLocation) { }

    /**
     * Connects to a service with the given name. The service must already be started
     * (or in the process of starting), otherwise this method will reject.
     * @param serviceId The name to give the service
     * @param serviceType The type of the service with the given name (usually the top-level import of the service module)
     */
    public async findService<T>(serviceId: string, serviceType: Thrift.TClientConstructor<T>): Promise<ThriftClient<T>> {
        const registry = await ThriftClient.connect(this.registryLocation, CSpyServiceRegistry);

        const location = await registry.service.waitForService(serviceId, ThriftServiceRegistry.SERVICE_LOOKUP_TIMEOUT);
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

    public dispose() {
        this.activeServers.forEach(server => server.close());
    }
}