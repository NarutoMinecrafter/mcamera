import { Repository } from 'typeorm';
import { Device } from './device.entity';
import { CreateDeviceDto } from './dto/create-device.dto';
import { User } from '../auth/user.entity';
export declare class DeviceRepository extends Repository<Device> {
    private logger;
    createDevice(createDeviceDto: CreateDeviceDto, user: User): Promise<Device>;
    getUserDevices(user: User): Promise<Device[]>;
    getDeviceById(id: number, user: User): Promise<Device>;
    getDeviceByIdentifier(identifier: string): Promise<Device>;
}
