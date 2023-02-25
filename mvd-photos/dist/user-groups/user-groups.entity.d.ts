import { BaseEntity } from 'typeorm';
import { User } from '../auth/user.entity';
import { Device } from '../devices/device.entity';
export declare class UserGroups extends BaseEntity {
    id: number;
    users: User[];
    devices: Device[];
}
