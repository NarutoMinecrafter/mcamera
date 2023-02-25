import {
    WebSocketGateway,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect, OnGatewayInit
} from '@nestjs/websockets';
import {Logger} from '@nestjs/common';
import {Socket, Server} from 'socket.io';
import {SocketService} from './socket/socket.service';


@WebSocketGateway()
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

    constructor(
        private socketService: SocketService
    ) {}

    @WebSocketServer()
    server: Server;

    private logger: Logger = new Logger('AppGateway');


    afterInit(server: Server) {
        this.socketService.socket = server;
        this.logger.log('Init');
    }

    handleDisconnect(client: Socket) {
        for (let i = 0; i < this.socketService.wsClients.length; i++) {
            if (this.socketService.wsClients[i] === client) {
                this.socketService.wsClients.splice(i, 1);
                break;
            }
        }
        this.logger.log(`Client disconnected: ${client.id}`);
    }

    handleConnection(client: Socket, ...args: any[]) {
        this.socketService.wsClients.push(client);
        this.socketService.wsClients = Array.from(new Set(this.socketService.wsClients));
        this.logger.log(`Client connected: ${client.id}`);
    }
}