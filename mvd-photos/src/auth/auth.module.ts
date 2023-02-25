import {Module} from '@nestjs/common';
import {JwtModule} from '@nestjs/jwt'
import {TypeOrmModule} from '@nestjs/typeorm';
import {PassportModule} from '@nestjs/passport';
import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';
import {UserRepository} from './user.repository';
import {JwtStrategy} from './jwt.strategy';
import * as config from 'config';
import {PermissionsModule} from '../permissions/permissions.module';

const jwtConfig = config.get('jwt');

@Module({
    imports: [
        PassportModule.register({defaultStrategy: 'jwt'}),
        JwtModule.register({
            secret: process.env.JWT_SECRET || jwtConfig.secret,
            signOptions: {
                expiresIn: jwtConfig.expiresIn
            }
        }),
        PermissionsModule,
        TypeOrmModule.forFeature([UserRepository])
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        JwtStrategy
    ],
    exports: [
        JwtStrategy,
        PassportModule
    ]
})
export class AuthModule {
}
