import {ConflictException, Injectable, InternalServerErrorException, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {DeviceRepository} from './device.repository';
import {Device} from './device.entity';
import {CreateDeviceDto} from './dto/create-device.dto';
import {User} from '../auth/user.entity';
import {PacketsService} from '../packets/packets.service';
import {Status} from '../packets/status.enum';

@Injectable()
export class DevicesService {
    constructor(
        @InjectRepository(DeviceRepository)
        private deviceRepository: DeviceRepository,
        private packetsService: PacketsService
    ) {}

    async getUserDevices(user: User): Promise<Device[]> {
        return this.deviceRepository.getUserDevices(user);
    }

    async getDeviceById(id: number, user: User): Promise<Device> {
        return this.deviceRepository.getDeviceById(id, user);
    }

    async getDeviceByIdentifier(identifier: string): Promise<Device> {
        const found = await this.deviceRepository.getDeviceByIdentifier(identifier);
        if (!found) {
            throw new NotFoundException(`Device with ${identifier} not found`);
        }
        return found;
    }

    async createDevice(
        createDeviceDto: CreateDeviceDto,
        user: User
    ): Promise<Device> {
        try {
            const device = await this.deviceRepository.createDevice(createDeviceDto, user);
            device.packet = await this.packetsService.createPacket({
                deviceId: device.id,
                status: Status.TO_SEND
            });
            return device;
        } catch (e) {
            if (e.code === '23505') {
                throw new ConflictException('Device with such ID already already exists.');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

    async deleteDevice(id: number, user: User): Promise<void> {
        const result = await this.deviceRepository.delete({id, userGroupsId: user.userGroupsId});

        if (result.affected === 0) {
            throw new NotFoundException(`Device with ${id} not found`);
        }
    }

    async updateDevice(id: number, createDeviceDto: CreateDeviceDto, user: User): Promise<Device> {
        const device = await this.getDeviceById(id, user);
        Object.assign(device, createDeviceDto);
        await device.save();
        await this.packetsService.updatePacketStatus(device.packet.id, Status.TO_SEND);
        device.packet.status = Status.TO_SEND;

        return device;
    }

    async updateDeviceBattery(device: Device, battery: number): Promise<Device> {
        device.battery = battery;
        await device.save();
        return device;
    }
}
