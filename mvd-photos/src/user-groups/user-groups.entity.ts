import {BaseEntity, Entity, OneToMany, PrimaryGeneratedColumn, Unique} from 'typeorm';
import {User} from '../auth/user.entity';
import {Device} from '../devices/device.entity';


@Entity()
@Unique(['id'])
export class UserGroups extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => User, user => user.userGroups, {eager: true})
    users: User[];

    @OneToMany(() => Device, device => device.userGroups, {eager: true, onDelete: 'CASCADE'})
    devices: Device[];
}
