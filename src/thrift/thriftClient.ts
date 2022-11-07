/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */



import * as Thrift from "thrift";
import { EventEmitter } from "events";
import { Protocol, ServiceLocation, Transport } from "./bindings/ServiceRegistry_types";

/**
 * A client connected to a thrift service. The owner is responsible for
 * closing the client when done with it. Emits 'close' when closed.
 */
export class ThriftClient<T> extends EventEmitter {
    private closed = false;

    /**
     * Creates a new thrift client by connecting to a service at given location.
     * @param location The location where the service is at
     * @param serviceType The type of the service at the location
     */
    public static connect<T>(location: ServiceLocation, serviceType: Thrift.TClientConstructor<T>): Promise<ThriftClient<T>> {
        if (location.transport !== Transport.Socket) {
            return Promise.reject(new Error("Trying to connect to service with unsupported transport."));
        }
        const options: Thrift.ConnectOptions = {
            transport: Thrift.TBufferedTransport,
            protocol: location.protocol === Protocol.Binary ? Thrift.TBinaryProtocol : Thrift.TJSONProtocol,
        };
        return new Promise((resolve, reject) => {
            const conn = Thrift.createConnection(location.host, location.port, options).
                on("error", err => reject(err)).
                on("connect", () => {
                    const client = Thrift.createClient<T>(serviceType, conn);
                    resolve(new ThriftClient(conn, client));
                });
        });
    }

    private constructor(private readonly connection: Thrift.Connection, private readonly _service: T) {
        super();
        this.connection.on("close", () => {
            this.closed = true;
            this.emit("close");
        });
    }

    public get service(): T {
        return this._service;
    }

    /**
     * Disconnect the client. Do not use the client after closing it.
     */
    public close() {
        if (!this.closed) {
            this.connection.end();
        }
    }
}