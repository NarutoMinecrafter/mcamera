import { BaseEntity } from 'typeorm';
import { Device } from '../devices/device.entity';
import { Source } from './source.enum';
export declare class Photo extends BaseEntity {
    id: number;
    originalName: string;
    originaltime: string;
    name: string;
    path: string;
    type: string;
    createDateTime: Date;
    source: Source;
    device: Device;
    deviceId: number;
}
