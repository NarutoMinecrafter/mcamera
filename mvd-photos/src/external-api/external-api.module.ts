import {Module} from '@nestjs/common';
import {ExternalApiController} from './external-api.controller';
import {PacketsModule} from '../packets/packets.module';
import {PhotosModule} from '../photos/photos.module';
import {DevicesModule} from '../devices/devices.module';
import {MulterModule} from '@nestjs/platform-express';
import {SocketModule} from '../socket/socket.module';

@Module({
    imports: [
        PacketsModule, PhotosModule, DevicesModule, SocketModule,
        MulterModule.register({
            dest: './upload',
            preservePath: true
        })
    ],
    controllers: [ExternalApiController],
})
export class ExternalApiModule {

}
