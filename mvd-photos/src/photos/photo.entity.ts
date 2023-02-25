import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn, ManyToOne,
    PrimaryGeneratedColumn
} from 'typeorm';
import {Device} from '../devices/device.entity';
import {Source} from './source.enum';


@Entity()
export class Photo extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    originalName: string;

    @Column({type: 'bigint'})
    originaltime: string;

    @Column()
    name: string;

    @Column()
    path: string;

    @Column()
    type: string;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createDateTime: Date;

    @Column()
    source: Source;

    @ManyToOne(() => Device, device => device.photo, {eager: true, onDelete: 'CASCADE'})
    @JoinColumn()
    device: Device;

    @Column()
    deviceId: number;
}
