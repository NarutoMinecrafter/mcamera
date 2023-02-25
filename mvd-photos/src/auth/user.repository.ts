import {EntityRepository, Repository} from 'typeorm';
import {ConflictException, InternalServerErrorException} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import {User} from './user.entity';
import {AuthCredentialsDto} from './dto/auth-credentials.dto';
import {Errors} from '../constants/errors';
import {JwtPayload} from './jwt-payload.interface';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async signUp(authCredentialsDto: AuthCredentialsDto, userGroupsId: number) {
        const user = new User();
        user.userGroupsId = userGroupsId;
        return this.saveUser(user, authCredentialsDto);
    }

    async saveUser(user: User, authCredentialsDto: AuthCredentialsDto) {
        const {username, password, isAdmin} = authCredentialsDto;
        user.username = username.toLowerCase();
        user.salt = await bcrypt.genSalt();
        user.password = await this.hashPassword(password, user.salt);
        user.isAdmin = isAdmin === undefined ? false : isAdmin;

        try {
            await user.save();
            return user;
        } catch (error) {
            if (error.code === Errors.DuplicateEntry) {
                throw new ConflictException('Username already exists');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

    async validateUserPassword(authCredentialsDto: AuthCredentialsDto): Promise<JwtPayload> {
        const {username, password} = authCredentialsDto;
        const user = await this.findOne({username: username.toLowerCase()});

        if (user && await user.validatePassword(password)) {
            return {
                username: user.username,
                isAdmin: user.isAdmin
            };
        } else {
            return null;
        }
    }

    private async hashPassword(password: string, salt: string) {
        return bcrypt.hash(password, salt);
    }

    async getUsersWithDevices(): Promise<User[]> {
        const queryBuilder = this.createQueryBuilder('user');
        queryBuilder.leftJoinAndSelect('user.permission', 'permission');
        queryBuilder.leftJoinAndSelect('user.userGroups', 'userGroups');
        queryBuilder.leftJoinAndSelect('userGroups.devices', 'devices');
        queryBuilder.leftJoinAndSelect('userGroups.users', 'users');
        queryBuilder.addOrderBy('user.username');
        queryBuilder.addOrderBy('devices.id');
        queryBuilder.leftJoinAndSelect('devices.packet', 'packet');

        try {
            return await queryBuilder.getMany();
        } catch (err) {
            throw new InternalServerErrorException();
        }
    }
}
