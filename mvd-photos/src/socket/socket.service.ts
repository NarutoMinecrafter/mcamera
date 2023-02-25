import {Injectable} from '@nestjs/common';
import {Server, Socket} from 'socket.io';

@Injectable()
export class SocketService {
    public socket: Server = null;
    public wsClients: Socket[] = [];

    public send<T>(msg: string, data: T) {
        for (const c of this.wsClients) {
            c.send(JSON.stringify({msg, data}));
        }
    }
}
