import {BaseEntity, Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, Unique} from 'typeorm';
import * as bcrypt from 'bcrypt';
import {Permission} from '../permissions/permission.entity';
import {UserGroups} from '../user-groups/user-groups.entity';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    isAdmin: boolean;

    @Column()
    salt: string;

    @OneToOne(() => Permission, perm => perm.user, {eager: false, onDelete: 'CASCADE'})
    permission: Permission;

    @ManyToOne(() => UserGroups, userGroup => userGroup.users, {eager: false})
    userGroups: UserGroups;

    @Column()
    userGroupsId: number;

    async validatePassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt);
        return hash === this.password;
    }
}
