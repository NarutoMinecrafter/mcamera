import { UserGroups } from './user-groups.entity';
import { UserGroupsService } from './user-groups.service';
export declare class UserGroupsController {
    private userGroupsService;
    constructor(userGroupsService: UserGroupsService);
    private logger;
    getUserGroups(): Promise<UserGroups[]>;
    deleteUserGroup(userGroupId: number): Promise<void>;
    createUserGroup(): Promise<UserGroups>;
}
