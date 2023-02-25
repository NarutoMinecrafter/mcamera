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
exports.ExternalApiController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const api_file_decorator_1 = require("../photos/api-file.decorator");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const devices_service_1 = require("../devices/devices.service");
const packets_service_1 = require("../packets/packets.service");
const photos_service_1 = require("../photos/photos.service");
const createSettingsPacket_1 = require("./helpers/createSettingsPacket");
const source_enum_1 = require("../photos/source.enum");
const source_validation_pipe_1 = require("../photos/pipes/source-validation.pipe");
const socket_service_1 = require("../socket/socket.service");
const status_enum_1 = require("../packets/status.enum");
let ExternalApiController = class ExternalApiController {
    constructor(photosService, devicesService, packetsService, socketService) {
        this.photosService = photosService;
        this.devicesService = devicesService;
        this.packetsService = packetsService;
        this.socketService = socketService;
        this.logger = new common_1.Logger('External Api Controller');
    }
    async uploadFile(file, identifier, source) {
        this.logger.log('Uploading Photo');
        const device = await this.devicesService.getDeviceByIdentifier(identifier);
        this.photosService.createPhoto({
            deviceId: device.id,
            originalName: file.originalname,
            path: file.path,
            type: file.mimetype,
            name: file.filename,
            originaltime: +(file.originalname.split('.')[0]),
            source
        });
        return createSettingsPacket_1.createSettingsPacket(device);
    }
    async check(identifier, battery) {
        this.logger.log(`Check - ${identifier}`);
        const device = await this.devicesService.getDeviceByIdentifier(identifier);
        await this.devicesService.updateDeviceBattery(device, battery);
        device.packet = await this.packetsService.updatePacketStatus(device.packet.id, status_enum_1.Status.NONE);
        this.socketService.send('RECEIVED_SETTINGS', device);
        return createSettingsPacket_1.createSettingsPacket(device);
    }
};
__decorate([
    common_1.Post('/:identifier/upload'),
    swagger_1.ApiConsumes('multipart/form-data'),
    api_file_decorator_1.ApiFile(),
    swagger_1.ApiQuery({ name: 'source', enum: source_enum_1.Source }),
    common_1.UseInterceptors(platform_express_1.FileInterceptor('file')),
    openapi.ApiResponse({ status: 201, type: require("../devices/dto/create-device.dto").CreateDeviceDto }),
    __param(0, common_1.UploadedFile()),
    __param(1, common_1.Param('identifier')),
    __param(2, common_1.Query('source', source_validation_pipe_1.SourceValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], ExternalApiController.prototype, "uploadFile", null);
__decorate([
    common_1.Get('/:identifier/settings'),
    openapi.ApiResponse({ status: 200, type: require("../devices/dto/create-device.dto").CreateDeviceDto }),
    __param(0, common_1.Param('identifier')),
    __param(1, common_1.Query('battery', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], ExternalApiController.prototype, "check", null);
ExternalApiController = __decorate([
    swagger_1.ApiTags('ExternalApi'),
    common_1.Controller('external-api'),
    __metadata("design:paramtypes", [photos_service_1.PhotosService,
        devices_service_1.DevicesService,
        packets_service_1.PacketsService,
        socket_service_1.SocketService])
], ExternalApiController);
exports.ExternalApiController = ExternalApiController;
//# sourceMappingURL=external-api.controller.js.map