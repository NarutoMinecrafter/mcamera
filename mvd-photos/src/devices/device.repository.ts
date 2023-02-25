import {EntityRepository, Repository} from 'typeorm';
import {Device} from './device.entity';
import {CreateDeviceDto} from './dto/create-device.dto';
import {User} from '../auth/user.entity';
import {InternalServerErrorException, Logger, NotFoundException} from '@nestjs/common';

@EntityRepository(Device)
export class DeviceRepository extends Repository<Device> {
    private logger = new Logger('Device Repository');

    async createDevice(createDeviceDto: CreateDeviceDto, user: User): Promise<Device> {
        const device = new Device();
        Object.assign(device, createDeviceDto);
        device.userGroupsId = user.userGroupsId;
        await device.save();
        return device;
    }

    async getUserDevices(user: User): Promise<Device[]> {
        const queryBuilder = this.createQueryBuilder('device');

        queryBuilder.where('device.userGroupsId = :userGroupsId', {userGroupsId: user.userGroupsId});
        queryBuilder.leftJoinAndSelect('device.packet', 'packet');
        queryBuilder.addOrderBy('device.id');

        try {
            return await queryBuilder.getMany();
        } catch (err) {
            this.logger.error(`Failed to get Devices for user "${user.username}"`, err.stack);
            throw new InternalServerErrorException();
        }

    }

    async getDeviceById(id: number, user: User): Promise<Device> {

        const queryBuilder = this.createQueryBuilder('device');

        queryBuilder.andWhere('device.userGroupsId = :userGroupsId', {userGroupsId: user.userGroupsId});
        queryBuilder.andWhere('device.id = :id', {id});
        queryBuilder.leftJoinAndSelect('device.packet', 'packet');

        const found = await queryBuilder.getOne();

        if (!found) {
            throw new NotFoundException(`Device with ${id} not found`);
        }

        return found;
    }

    async getDeviceByIdentifier(identifier: string): Promise<Device> {

        const queryBuilder = this.createQueryBuilder('device');

        queryBuilder.andWhere('device.identifier = :identifier', {identifier});
        queryBuilder.leftJoinAndSelect('device.packet', 'packet');

        const found = await queryBuilder.getOne();

        if (!found) {
            throw new NotFoundException(`Device with ${identifier} not found`);
        }

        return found;
    }
}
