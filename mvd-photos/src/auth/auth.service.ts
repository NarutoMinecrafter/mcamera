import {forwardRef, Inject, Injectable, UnauthorizedException} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {InjectRepository} from '@nestjs/typeorm';
import {UserRepository} from './user.repository';
import {AuthCredentialsDto} from './dto/auth-credentials.dto';
import {JwtPayload} from './jwt-payload.interface';
import {AccessTokenDto} from './dto/access-token.dto';
import {PermissionsService} from '../permissions/permissions.service';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        @Inject(forwardRef(() => PermissionsService))
        private permissionsService: PermissionsService,
        private jwtService: JwtService
    ) {}

    async signUp(authCredentialsDto: AuthCredentialsDto, userGroupId: number): Promise<void> {
        const user = await this.userRepository.signUp(authCredentialsDto, userGroupId);
        await this.permissionsService.createPermissions({}, user.id);
    }

    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<AccessTokenDto> {
        const jwtPayload = await this.userRepository.validateUserPassword(authCredentialsDto);

        if (!jwtPayload) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload: JwtPayload = jwtPayload;
        const accesstoken = await this.jwtService.sign(payload);

        return {accesstoken}
    }
}
