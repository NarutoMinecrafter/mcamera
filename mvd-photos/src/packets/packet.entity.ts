import {BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Device} from '../devices/device.entity';
import {Status} from './status.enum';


@Entity()
export class Packet extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    status: Status;

    @OneToOne(() => Device, device => device.packet, {eager: true, onDelete: 'CASCADE'})
    @JoinColumn()
    device: Device;

    @Column()
    deviceId: number;

    @Column({type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP'})
    lastPacketTime: Date;
}
