import {EntityRepository, Repository} from 'typeorm';
import {InternalServerErrorException, Logger} from '@nestjs/common';
import {UserGroups} from './user-groups.entity';

@EntityRepository(UserGroups)
export class UserGroupsRepository extends Repository<UserGroups> {
    private logger = new Logger('UserGroups Repository');

    async getUserGroups(): Promise<UserGroups[]> {
        const queryBuilder = this.createQueryBuilder('user_groups');

        queryBuilder.leftJoinAndSelect('user_groups.users', 'users');
        queryBuilder.leftJoinAndSelect('user_groups.devices', 'devices');
        queryBuilder.leftJoinAndSelect('users.permission', 'permission');
        queryBuilder.addOrderBy('user_groups.id');
        try {
            return await queryBuilder.getMany();
        } catch (err) {
            this.logger.error('Failed to get UserGroups for user', err.stack);
            throw new InternalServerErrorException();
        }
    }

    async createUserGroup(): Promise<UserGroups> {
        const userGroup = new UserGroups();
        await userGroup.save();
        userGroup.users = [];
        userGroup.devices = [];
        return userGroup;
    }
}
