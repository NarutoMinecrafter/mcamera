import { DeviceRepository } from './device.repository';
import { Device } from './device.entity';
import { CreateDeviceDto } from './dto/create-device.dto';
import { User } from '../auth/user.entity';
import { PacketsService } from '../packets/packets.service';
export declare class DevicesService {
    private deviceRepository;
    private packetsService;
    constructor(deviceRepository: DeviceRepository, packetsService: PacketsService);
    getUserDevices(user: User): Promise<Device[]>;
    getDeviceById(id: number, user: User): Promise<Device>;
    getDeviceByIdentifier(identifier: string): Promise<Device>;
    createDevice(createDeviceDto: CreateDeviceDto, user: User): Promise<Device>;
    deleteDevice(id: number, user: User): Promise<void>;
    updateDevice(id: number, createDeviceDto: CreateDeviceDto, user: User): Promise<Device>;
    updateDeviceBattery(device: Device, battery: number): Promise<Device>;
}
