"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = exports.serverTCP = void 0;
const net = require("net");
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const operators_1 = require("rxjs/operators");
const rxjs_1 = require("rxjs");
const config = require("config");
const serverConfig = config.get('server');
const logger = new common_1.Logger('bootstrap');
const msOptions = {
    transport: microservices_1.Transport.TCP,
    options: {
        host: serverConfig.host,
        port: serverConfig.portMS
    }
};
const client = microservices_1.ClientProxyFactory.create(msOptions);
exports.client = client;
const serverTCP = net.createServer(socket => {
    socket.on('data', async (data) => {
        client.send('data', data)
            .pipe(operators_1.catchError((message) => {
            logger.error(message);
            return rxjs_1.of(undefined);
        }))
            .subscribe((res) => {
            if (res) {
                socket.write(new Uint8Array(res));
            }
        });
    });
    socket.on('error', err => {
        logger.log('decode/utils/index: Caught flash policy server socket error: ');
        logger.error(`Socket On Error: ${err.stack}`);
    });
});
exports.serverTCP = serverTCP;
//# sourceMappingURL=tcp-device.server.js.map