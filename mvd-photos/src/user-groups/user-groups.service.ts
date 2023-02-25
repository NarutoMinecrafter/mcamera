import {ConflictException, Injectable, InternalServerErrorException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {UserGroupsRepository} from './user-groups.repository';
import {UserGroups} from './user-groups.entity';

@Injectable()
export class UserGroupsService {
    constructor(
        @InjectRepository(UserGroupsRepository)
        private userGroupsRepository: UserGroupsRepository,
    ) {}

    async getUserGroups(): Promise<UserGroups[]> {
        return this.userGroupsRepository.getUserGroups();
    }

    async deleteUserGroup(userGroupId: number): Promise<void> {
        try {
            await this.userGroupsRepository.delete({id: userGroupId});
        } catch (e) {
            if (e.code === '23503') {
                throw new ConflictException('Cannot delete Group with users.');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

    async createUserGroup(): Promise<UserGroups> {
        return this.userGroupsRepository.createUserGroup();
    }
}
