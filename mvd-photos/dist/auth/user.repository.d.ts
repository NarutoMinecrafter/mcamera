import { Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtPayload } from './jwt-payload.interface';
export declare class UserRepository extends Repository<User> {
    signUp(authCredentialsDto: AuthCredentialsDto, userGroupsId: number): Promise<User>;
    saveUser(user: User, authCredentialsDto: AuthCredentialsDto): Promise<User>;
    validateUserPassword(authCredentialsDto: AuthCredentialsDto): Promise<JwtPayload>;
    private hashPassword;
    getUsersWithDevices(): Promise<User[]>;
}
