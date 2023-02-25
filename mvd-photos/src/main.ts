import {NestFactory} from '@nestjs/core';
import {Logger} from '@nestjs/common';
import {AppModule} from './app.module';
import * as config from 'config';
import {MicroserviceOptions, Transport} from '@nestjs/microservices';
import {serverTCP} from './tcp-device.server';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import {WsAdapter} from '@nestjs/platform-ws';


async function bootstrap() {
    const serverConfig = config.get('server');
    const logger = new Logger('bootstrap');
    const port = process.env.PORT || serverConfig.port;
    const portTcp = process.env.PORT_TCP || serverConfig.portTcp;
    const portMS = process.env.PORT_MS || serverConfig.portMS;

    const app = await NestFactory.create(AppModule);
    app.enableCors();

    /******************** Swagger start *******************/
    const options = new DocumentBuilder()
        .setTitle('Mvd')
        .setDescription('The Mvd API description')
        .setVersion('1.0')
        .addServer(`http://localhost:${port}`)
        .addServer(`http://k2.stoer.biz:${port}`)
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);
    /******************** Swagger end *******************/

    app.connectMicroservice<MicroserviceOptions>({
        transport: Transport.TCP,
        options: {
            port: portMS
        }
    }, {inheritAppConfig: true});


    if (process.env.NODE_ENV === 'development') {
        app.enableCors({origin: serverConfig.origin});
    } else {
        app.enableCors({origin: serverConfig.origin});
        logger.log(`Accepting requests from origin "${serverConfig.origin}"`);
    }

    app.useWebSocketAdapter(new WsAdapter(app));
    await app.startAllMicroservicesAsync();
    await app.listen(port);
    logger.log(`Application listening on port ${port}`);

    serverTCP.listen(portTcp, () => {
        logger.log(`Start LOW-TCP-App on TCPPort: ${serverConfig.portTcp}`);
    });
}

bootstrap();

