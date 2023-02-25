import { BaseEntity } from 'typeorm';
import { Permission } from '../permissions/permission.entity';
import { UserGroups } from '../user-groups/user-groups.entity';
export declare class User extends BaseEntity {
    id: number;
    username: string;
    password: string;
    isAdmin: boolean;
    salt: string;
    permission: Permission;
    userGroups: UserGroups;
    userGroupsId: number;
    validatePassword(password: string): Promise<boolean>;
}
