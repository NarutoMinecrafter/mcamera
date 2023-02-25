/// <reference types="node" />
import * as net from 'net';
declare const client: import("@nestjs/microservices").ClientProxy & import("@nestjs/microservices").Closeable;
declare const serverTCP: net.Server;
export { serverTCP, client };
