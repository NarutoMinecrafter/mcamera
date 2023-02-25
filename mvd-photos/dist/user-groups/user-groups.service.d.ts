import { UserGroupsRepository } from './user-groups.repository';
import { UserGroups } from './user-groups.entity';
export declare class UserGroupsService {
    private userGroupsRepository;
    constructor(userGroupsRepository: UserGroupsRepository);
    getUserGroups(): Promise<UserGroups[]>;
    deleteUserGroup(userGroupId: number): Promise<void>;
    createUserGroup(): Promise<UserGroups>;
}
