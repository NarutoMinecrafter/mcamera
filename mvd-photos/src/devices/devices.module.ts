import {Module} from '@nestjs/common';
import {DevicesController} from './devices.controller';
import {DevicesService} from './devices.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {DeviceRepository} from './device.repository';
import {AuthModule} from '../auth/auth.module';
import {PacketsModule} from '../packets/packets.module';
import {UsersModule} from '../users/users.module';


@Module({
    imports: [
        TypeOrmModule.forFeature([DeviceRepository]),
        AuthModule,
        PacketsModule,
        UsersModule
    ],
    controllers: [DevicesController],
    providers: [DevicesService],
    exports: [DevicesService]
})
export class DevicesModule {}
