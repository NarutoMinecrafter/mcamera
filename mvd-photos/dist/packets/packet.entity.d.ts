import { BaseEntity } from 'typeorm';
import { Device } from '../devices/device.entity';
import { Status } from './status.enum';
export declare class Packet extends BaseEntity {
    id: number;
    status: Status;
    device: Device;
    deviceId: number;
    lastPacketTime: Date;
}
