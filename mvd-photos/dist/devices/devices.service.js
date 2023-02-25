"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DevicesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const device_repository_1 = require("./device.repository");
const packets_service_1 = require("../packets/packets.service");
const status_enum_1 = require("../packets/status.enum");
let DevicesService = class DevicesService {
    constructor(deviceRepository, packetsService) {
        this.deviceRepository = deviceRepository;
        this.packetsService = packetsService;
    }
    async getUserDevices(user) {
        return this.deviceRepository.getUserDevices(user);
    }
    async getDeviceById(id, user) {
        return this.deviceRepository.getDeviceById(id, user);
    }
    async getDeviceByIdentifier(identifier) {
        const found = await this.deviceRepository.getDeviceByIdentifier(identifier);
        if (!found) {
            throw new common_1.NotFoundException(`Device with ${identifier} not found`);
        }
        return found;
    }
    async createDevice(createDeviceDto, user) {
        try {
            const device = await this.deviceRepository.createDevice(createDeviceDto, user);
            device.packet = await this.packetsService.createPacket({
                deviceId: device.id,
                status: status_enum_1.Status.TO_SEND
            });
            return device;
        }
        catch (e) {
            if (e.code === '23505') {
                throw new common_1.ConflictException('Device with such ID already already exists.');
            }
            else {
                throw new common_1.InternalServerErrorException();
            }
        }
    }
    async deleteDevice(id, user) {
        const result = await this.deviceRepository.delete({ id, userGroupsId: user.userGroupsId });
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Device with ${id} not found`);
        }
    }
    async updateDevice(id, createDeviceDto, user) {
        const device = await this.getDeviceById(id, user);
        Object.assign(device, createDeviceDto);
        await device.save();
        await this.packetsService.updatePacketStatus(device.packet.id, status_enum_1.Status.TO_SEND);
        device.packet.status = status_enum_1.Status.TO_SEND;
        return device;
    }
    async updateDeviceBattery(device, battery) {
        device.battery = battery;
        await device.save();
        return device;
    }
};
DevicesService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(device_repository_1.DeviceRepository)),
    __metadata("design:paramtypes", [device_repository_1.DeviceRepository,
        packets_service_1.PacketsService])
], DevicesService);
exports.DevicesService = DevicesService;
//# sourceMappingURL=devices.service.js.map