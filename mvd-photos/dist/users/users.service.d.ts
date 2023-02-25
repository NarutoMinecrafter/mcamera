import { UserRepository } from '../auth/user.repository';
import { User } from '../auth/user.entity';
import { AuthCredentialsDto } from '../auth/dto/auth-credentials.dto';
export declare class UsersService {
    private userRepository;
    constructor(userRepository: UserRepository);
    getUsersWithDevices(): Promise<User[]>;
    getUserById(id: number): Promise<User>;
    removeUser(id: number): Promise<void>;
    editUser(id: number, authCredentialsDto: AuthCredentialsDto): Promise<User>;
}
