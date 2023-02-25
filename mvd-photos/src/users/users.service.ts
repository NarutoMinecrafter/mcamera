import {
    HttpException, HttpStatus,
    Injectable,
    InternalServerErrorException,
    NotFoundException
} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {UserRepository} from '../auth/user.repository';
import {User} from '../auth/user.entity';
import {AuthCredentialsDto} from '../auth/dto/auth-credentials.dto';


@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ) {}

    async getUsersWithDevices(): Promise<User[]> {
        return this.userRepository.getUsersWithDevices();
    }

    async getUserById(id: number): Promise<User> {
        const found = await this.userRepository.findOne(id);

        if (!found) {
            throw new NotFoundException(`User with id "${id}" not found`);
        }

        return found;
    }

    async removeUser(id: number): Promise<void> {
        const user = await this.userRepository.findOne({id});
        if (user?.username === 'admin') {
            throw new HttpException({
                status: HttpStatus.CONFLICT,
                error: 'Неможливо видалити Системного Адміна!'
            }, HttpStatus.CONFLICT);
        }
        try {
            await this.userRepository.delete({id});
        } catch (e) {
            if (e.code === '23503') {
                throw new HttpException({
                    status: HttpStatus.CONFLICT,
                    error: 'Неможливо видалити користувача з активними пристроями. Видаліть пристрої спочатку.'
                }, HttpStatus.CONFLICT);
            }
            throw new InternalServerErrorException(e);
        }
    }

    async editUser(id: number, authCredentialsDto: AuthCredentialsDto): Promise<User> {
        const user = await this.getUserById(id);
        if (user?.username === 'admin') {
            throw new HttpException({
                status: HttpStatus.CONFLICT,
                error: 'Неможливо редагувати Системного Адміна!'
            }, HttpStatus.CONFLICT);
        }
        return this.userRepository.saveUser(user, authCredentialsDto);
    }
}
