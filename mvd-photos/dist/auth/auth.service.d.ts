import { JwtService } from '@nestjs/jwt';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AccessTokenDto } from './dto/access-token.dto';
import { PermissionsService } from '../permissions/permissions.service';
export declare class AuthService {
    private userRepository;
    private permissionsService;
    private jwtService;
    constructor(userRepository: UserRepository, permissionsService: PermissionsService, jwtService: JwtService);
    signUp(authCredentialsDto: AuthCredentialsDto, userGroupId: number): Promise<void>;
    signIn(authCredentialsDto: AuthCredentialsDto): Promise<AccessTokenDto>;
}
