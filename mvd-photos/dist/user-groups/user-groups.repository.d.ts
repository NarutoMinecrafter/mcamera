import { Repository } from 'typeorm';
import { UserGroups } from './user-groups.entity';
export declare class UserGroupsRepository extends Repository<UserGroups> {
    private logger;
    getUserGroups(): Promise<UserGroups[]>;
    createUserGroup(): Promise<UserGroups>;
}
