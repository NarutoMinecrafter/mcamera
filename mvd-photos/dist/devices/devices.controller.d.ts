import { DevicesService } from './devices.service';
import { User } from '../auth/user.entity';
import { Device } from './device.entity';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UsersService } from '../users/users.service';
export declare class DevicesController {
    private devicesService;
    private usersService;
    private logger;
    constructor(devicesService: DevicesService, usersService: UsersService);
    getDeviceById(id: number, user: User): Promise<Device>;
    getUserDevices(user: User): Promise<Device[]>;
    createDevice(createDeviceDto: CreateDeviceDto, user: User): Promise<Device>;
    deleteDevice(id: number, user: User): Promise<void>;
    updateDevice(id: number, createDeviceDto: CreateDeviceDto, user: User): Promise<Device>;
    createDeviceAdmin(userId: number, createDeviceDto: CreateDeviceDto): Promise<Device>;
    removeDeviceAdmin(userId: number, deviceId: number): Promise<void>;
    updateDeviceAdmin(userId: number, deviceId: number, createDeviceDto: CreateDeviceDto): Promise<Device>;
}
