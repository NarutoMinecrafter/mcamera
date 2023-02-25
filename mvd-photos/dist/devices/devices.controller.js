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
exports.DevicesController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const devices_service_1 = require("./devices.service");
const get_user_decorator_1 = require("../auth/get-user.decorator");
const user_entity_1 = require("../auth/user.entity");
const create_device_dto_1 = require("./dto/create-device.dto");
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
const roles_guard_1 = require("../auth/roles.guard");
const roles_decorator_1 = require("../auth/roles.decorator");
const users_service_1 = require("../users/users.service");
const device_settings_validation_pipe_1 = require("./pipes/device-settings-validation.pipe");
let DevicesController = class DevicesController {
    constructor(devicesService, usersService) {
        this.devicesService = devicesService;
        this.usersService = usersService;
        this.logger = new common_1.Logger('Device Controller');
    }
    getDeviceById(id, user) {
        return this.devicesService.getDeviceById(id, user);
    }
    getUserDevices(user) {
        this.logger.verbose(`User "${user.username}" retrieving all devices.`);
        return this.devicesService.getUserDevices(user);
    }
    createDevice(createDeviceDto, user) {
        this.logger.verbose(`User "${user.username}" creating new device. Data: ${JSON.stringify(createDeviceDto)}`);
        return this.devicesService.createDevice(createDeviceDto, user);
    }
    deleteDevice(id, user) {
        return this.devicesService.deleteDevice(id, user);
    }
    updateDevice(id, createDeviceDto, user) {
        return this.devicesService.updateDevice(id, createDeviceDto, user);
    }
    async createDeviceAdmin(userId, createDeviceDto) {
        this.logger.verbose(`Admin creating new device for user-id ${userId}. Data: ${JSON.stringify(createDeviceDto)}`);
        const user = await this.usersService.getUserById(userId);
        return this.devicesService.createDevice(createDeviceDto, user);
    }
    async removeDeviceAdmin(userId, deviceId) {
        this.logger.verbose(`Admin removing device for user-id ${userId}.`);
        const user = await this.usersService.getUserById(userId);
        return this.devicesService.deleteDevice(deviceId, user);
    }
    async updateDeviceAdmin(userId, deviceId, createDeviceDto) {
        this.logger.verbose(`Admin updating device for user-id ${userId}.`);
        const user = await this.usersService.getUserById(userId);
        return this.devicesService.updateDevice(deviceId, createDeviceDto, user);
    }
};
__decorate([
    swagger_1.ApiBearerAuth(),
    common_1.Get('/:id'),
    openapi.ApiResponse({ status: 200, type: require("./device.entity").Device }),
    __param(0, common_1.Param('id', common_1.ParseIntPipe)),
    __param(1, get_user_decorator_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], DevicesController.prototype, "getDeviceById", null);
__decorate([
    swagger_1.ApiBearerAuth(),
    common_1.Get(),
    openapi.ApiResponse({ status: 200, type: [require("./device.entity").Device] }),
    __param(0, get_user_decorator_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", Promise)
], DevicesController.prototype, "getUserDevices", null);
__decorate([
    swagger_1.ApiBearerAuth(),
    common_1.Post(),
    openapi.ApiResponse({ status: 201, type: require("./device.entity").Device }),
    __param(0, common_1.Body(common_1.ValidationPipe, device_settings_validation_pipe_1.DeviceSettingsValidationPipe)),
    __param(1, get_user_decorator_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_device_dto_1.CreateDeviceDto,
        user_entity_1.User]),
    __metadata("design:returntype", Promise)
], DevicesController.prototype, "createDevice", null);
__decorate([
    swagger_1.ApiBearerAuth(),
    common_1.Delete('/:id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, common_1.Param('id', common_1.ParseIntPipe)),
    __param(1, get_user_decorator_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], DevicesController.prototype, "deleteDevice", null);
__decorate([
    swagger_1.ApiBearerAuth(),
    common_1.Patch('/:id'),
    openapi.ApiResponse({ status: 200, type: require("./device.entity").Device }),
    __param(0, common_1.Param('id', common_1.ParseIntPipe)),
    __param(1, common_1.Body(common_1.ValidationPipe, device_settings_validation_pipe_1.DeviceSettingsValidationPipe)),
    __param(2, get_user_decorator_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_device_dto_1.CreateDeviceDto,
        user_entity_1.User]),
    __metadata("design:returntype", Promise)
], DevicesController.prototype, "updateDevice", null);
__decorate([
    swagger_1.ApiBearerAuth(),
    common_1.Post('/admin/:userId'),
    roles_decorator_1.Roles('admin'),
    openapi.ApiResponse({ status: 201, type: require("./device.entity").Device }),
    __param(0, common_1.Param('userId', common_1.ParseIntPipe)),
    __param(1, common_1.Body(common_1.ValidationPipe, device_settings_validation_pipe_1.DeviceSettingsValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_device_dto_1.CreateDeviceDto]),
    __metadata("design:returntype", Promise)
], DevicesController.prototype, "createDeviceAdmin", null);
__decorate([
    swagger_1.ApiBearerAuth(),
    common_1.Delete('/admin/:userId/:deviceId'),
    roles_decorator_1.Roles('admin'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, common_1.Param('userId', common_1.ParseIntPipe)),
    __param(1, common_1.Param('deviceId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], DevicesController.prototype, "removeDeviceAdmin", null);
__decorate([
    swagger_1.ApiBearerAuth(),
    common_1.Post('/admin/:userId/:deviceId'),
    roles_decorator_1.Roles('admin'),
    openapi.ApiResponse({ status: 201, type: require("./device.entity").Device }),
    __param(0, common_1.Param('userId', common_1.ParseIntPipe)),
    __param(1, common_1.Param('deviceId', common_1.ParseIntPipe)),
    __param(2, common_1.Body(common_1.ValidationPipe, device_settings_validation_pipe_1.DeviceSettingsValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, create_device_dto_1.CreateDeviceDto]),
    __metadata("design:returntype", Promise)
], DevicesController.prototype, "updateDeviceAdmin", null);
DevicesController = __decorate([
    swagger_1.ApiTags('Devices'),
    common_1.Controller('api/devices'),
    common_1.UseGuards(passport_1.AuthGuard(), roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [devices_service_1.DevicesService,
        users_service_1.UsersService])
], DevicesController);
exports.DevicesController = DevicesController;
//# sourceMappingURL=devices.controller.js.map