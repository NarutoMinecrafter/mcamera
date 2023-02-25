"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceRepository = void 0;
const typeorm_1 = require("typeorm");
const device_entity_1 = require("./device.entity");
const common_1 = require("@nestjs/common");
let DeviceRepository = class DeviceRepository extends typeorm_1.Repository {
    constructor() {
        super(...arguments);
        this.logger = new common_1.Logger('Device Repository');
    }
    async createDevice(createDeviceDto, user) {
        const device = new device_entity_1.Device();
        Object.assign(device, createDeviceDto);
        device.userGroupsId = user.userGroupsId;
        await device.save();
        return device;
    }
    async getUserDevices(user) {
        const queryBuilder = this.createQueryBuilder('device');
        queryBuilder.where('device.userGroupsId = :userGroupsId', { userGroupsId: user.userGroupsId });
        queryBuilder.leftJoinAndSelect('device.packet', 'packet');
        queryBuilder.addOrderBy('device.id');
        try {
            return await queryBuilder.getMany();
        }
        catch (err) {
            this.logger.error(`Failed to get Devices for user "${user.username}"`, err.stack);
            throw new common_1.InternalServerErrorException();
        }
    }
    async getDeviceById(id, user) {
        const queryBuilder = this.createQueryBuilder('device');
        queryBuilder.andWhere('device.userGroupsId = :userGroupsId', { userGroupsId: user.userGroupsId });
        queryBuilder.andWhere('device.id = :id', { id });
        queryBuilder.leftJoinAndSelect('device.packet', 'packet');
        const found = await queryBuilder.getOne();
        if (!found) {
            throw new common_1.NotFoundException(`Device with ${id} not found`);
        }
        return found;
    }
    async getDeviceByIdentifier(identifier) {
        const queryBuilder = this.createQueryBuilder('device');
        queryBuilder.andWhere('device.identifier = :identifier', { identifier });
        queryBuilder.leftJoinAndSelect('device.packet', 'packet');
        const found = await queryBuilder.getOne();
        if (!found) {
            throw new common_1.NotFoundException(`Device with ${identifier} not found`);
        }
        return found;
    }
};
DeviceRepository = __decorate([
    typeorm_1.EntityRepository(device_entity_1.Device)
], DeviceRepository);
exports.DeviceRepository = DeviceRepository;
//# sourceMappingURL=device.repository.js.map