import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AccessTokenDto } from './dto/access-token.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signUp(authCredentialsDto: AuthCredentialsDto, userGroupId: number): Promise<void>;
    signIn(authCredentialsDto: AuthCredentialsDto): Promise<AccessTokenDto>;
}
