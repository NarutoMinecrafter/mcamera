import {forwardRef, Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {PermissionsRepository} from './permissions.repository';
import {PermissionsService} from './permissions.service';
import {PermissionsController} from './permissions.controller';
import {AuthModule} from '../auth/auth.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([PermissionsRepository]),
        forwardRef(() => AuthModule),
    ],
    providers: [PermissionsService],
    controllers: [PermissionsController],
    exports: [PermissionsService]
})
export class PermissionsModule {
}
