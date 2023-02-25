import { Server, Socket } from 'socket.io';
export declare class SocketService {
    socket: Server;
    wsClients: Socket[];
    send<T>(msg: string, data: T): void;
}
