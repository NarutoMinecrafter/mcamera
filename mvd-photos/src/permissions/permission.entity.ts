import {
    BaseEntity,
    Column,
    Entity,
    JoinColumn, OneToOne,
    PrimaryGeneratedColumn
} from 'typeorm';
import {User} from '../auth/user.entity';

@Entity()
export class Permission extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    addDevice: boolean;

    @Column()
    removeDevice: boolean;

    @Column()
    editDevice: boolean;

    @Column()
    download: boolean;

    @Column()
    removePhoto: boolean;

    @OneToOne(() => User, user => user.permission, {eager: true, onDelete: 'CASCADE'})
    @JoinColumn()
    user: User;

    @Column()
    userId: number;
}
