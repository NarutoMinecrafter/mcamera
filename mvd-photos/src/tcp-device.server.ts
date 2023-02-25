import * as net from 'net';
import {Logger} from '@nestjs/common';
import {ClientOptions, ClientProxyFactory, Transport} from '@nestjs/microservices';
import {catchError} from 'rxjs/operators';
import {of} from 'rxjs';
import * as config from 'config';


const serverConfig = config.get('server');
const logger = new Logger('bootstrap');
const msOptions: ClientOptions = {
    transport: Transport.TCP,
    options: {
        host: serverConfig.host,
        port: serverConfig.portMS
    }
}
const client = ClientProxyFactory.create(msOptions);


const serverTCP = net.createServer(socket => {

    socket.on('data', async (data) => {
        client.send('data', data)
            .pipe(catchError((message: 'string') => {
                logger.error(message);
                return of(undefined)
            }))
            .subscribe((res: number[]) => {
                if (res) {
                    socket.write(new Uint8Array(res));
                }
            })
    });

    socket.on('error', err => {
        logger.log('decode/utils/index: Caught flash policy server socket error: ');
        logger.error(`Socket On Error: ${err.stack}`);
    });
});

export {
    serverTCP,
    client
};
