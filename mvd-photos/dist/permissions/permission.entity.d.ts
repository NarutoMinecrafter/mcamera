import { BaseEntity } from 'typeorm';
import { User } from '../auth/user.entity';
export declare class Permission extends BaseEntity {
    id: number;
    addDevice: boolean;
    removeDevice: boolean;
    editDevice: boolean;
    download: boolean;
    removePhoto: boolean;
    user: User;
    userId: number;
}
