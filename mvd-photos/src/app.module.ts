import {Module} from '@nestjs/common';
import {TypeOrmCoreModule} from '@nestjs/typeorm/dist/typeorm-core.module';
import {typeOrmConfig} from './config/typeorm.config';
import {AuthModule} from './auth/auth.module';
import {DevicesModule} from './devices/devices.module';
import {PacketsModule} from './packets/packets.module';
import {SocketModule} from './socket/socket.module';
import {AppGateway} from './app.gateway';
import {UsersModule} from './users/users.module';
import {PhotosModule} from './photos/photos.module';
import {UserGroupsModule} from './user-groups/user-groups.module';
import {ExternalApiModule} from './external-api/external-api.module';


@Module({
    imports: [
        TypeOrmCoreModule.forRoot(typeOrmConfig),
        AuthModule,
        DevicesModule,
        PacketsModule,
        SocketModule,
        UsersModule,
        PhotosModule,
        ExternalApiModule,
        UserGroupsModule,
    ],
    controllers: [],
    providers: [AppGateway],
})
export class AppModule {
}
