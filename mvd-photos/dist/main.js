"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const app_module_1 = require("./app.module");
const config = require("config");
const microservices_1 = require("@nestjs/microservices");
const tcp_device_server_1 = require("./tcp-device.server");
const swagger_1 = require("@nestjs/swagger");
const platform_ws_1 = require("@nestjs/platform-ws");
async function bootstrap() {
    const serverConfig = config.get('server');
    const logger = new common_1.Logger('bootstrap');
    const port = process.env.PORT || serverConfig.port;
    const portTcp = process.env.PORT_TCP || serverConfig.portTcp;
    const portMS = process.env.PORT_MS || serverConfig.portMS;
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    const options = new swagger_1.DocumentBuilder()
        .setTitle('Mvd')
        .setDescription('The Mvd API description')
        .setVersion('1.0')
        .addServer(`http://localhost:${port}`)
        .addServer(`http://k2.stoer.biz:${port}`)
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup('api', app, document);
    app.connectMicroservice({
        transport: microservices_1.Transport.TCP,
        options: {
            port: portMS
        }
    }, { inheritAppConfig: true });
    if (process.env.NODE_ENV === 'development') {
    }
    else {
        app.enableCors({ origin: serverConfig.origin });
        logger.log(`Accepting requests from origin "${serverConfig.origin}"`);
    }
    app.useWebSocketAdapter(new platform_ws_1.WsAdapter(app));
    await app.startAllMicroservicesAsync();
    await app.listen(port);
    logger.log(`Application listening on port ${port}`);
    tcp_device_server_1.serverTCP.listen(portTcp, () => {
        logger.log(`Start LOW-TCP-App on TCPPort: ${serverConfig.portTcp}`);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map