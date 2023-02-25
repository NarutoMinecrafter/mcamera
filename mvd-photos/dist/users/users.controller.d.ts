import { User } from '../auth/user.entity';
import { UsersService } from './users.service';
import { AuthCredentialsDto } from '../auth/dto/auth-credentials.dto';
export declare class UsersController {
    private usersService;
    private logger;
    constructor(usersService: UsersService);
    getUsersWithDevices(): Promise<User[]>;
    removeUser(userId: number): Promise<void>;
    editUser(userId: number, authCredentialsDto: AuthCredentialsDto): Promise<User>;
}
