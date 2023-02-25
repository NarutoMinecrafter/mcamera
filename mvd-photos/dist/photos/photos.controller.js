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
exports.PhotosController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const photos_service_1 = require("./photos.service");
const passport_1 = require("@nestjs/passport");
const roles_guard_1 = require("../auth/roles.guard");
const get_user_decorator_1 = require("../auth/get-user.decorator");
const user_entity_1 = require("../auth/user.entity");
const remove_photos_dto_1 = require("./dto/remove-photos.dto");
let PhotosController = class PhotosController {
    constructor(photosService) {
        this.photosService = photosService;
    }
    getPhotosById(deviceId, start, end, user) {
        return this.photosService.getPhotosByIdentifier(deviceId, user, start, end);
    }
    removePhotoById(id, user) {
        return this.photosService.removePhotoById(id);
    }
    getPhotoByPath(imageName, res) {
        return res.sendFile(imageName, { root: 'upload' });
    }
    async downloadPhotoByPath(imageName, res) {
        const newName = await this.photosService.getPhotoName(imageName);
        return res.download(`./upload/${imageName}`, newName);
    }
    getLastPhoto(deviceId) {
        return this.photosService.getLastPhoto(deviceId);
    }
    removePhotosById(removePhotosDto, user) {
        return this.photosService.removePhotosById(removePhotosDto.ids);
    }
};
__decorate([
    common_1.UseGuards(passport_1.AuthGuard(), roles_guard_1.RolesGuard),
    swagger_1.ApiBearerAuth(),
    common_1.Get('/:deviceId'),
    openapi.ApiResponse({ status: 200, type: [require("./photo.entity").Photo] }),
    __param(0, common_1.Param('deviceId', common_1.ParseIntPipe)),
    __param(1, common_1.Query('start', common_1.ParseIntPipe)),
    __param(2, common_1.Query('end', common_1.ParseIntPipe)),
    __param(3, get_user_decorator_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], PhotosController.prototype, "getPhotosById", null);
__decorate([
    common_1.UseGuards(passport_1.AuthGuard(), roles_guard_1.RolesGuard),
    swagger_1.ApiBearerAuth(),
    common_1.Delete('/:id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, common_1.Param('id', common_1.ParseIntPipe)),
    __param(1, get_user_decorator_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], PhotosController.prototype, "removePhotoById", null);
__decorate([
    common_1.Get('/preview/:imageName'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, common_1.Param('imageName')),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PhotosController.prototype, "getPhotoByPath", null);
__decorate([
    common_1.Get('/download/:imageName'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, common_1.Param('imageName')),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PhotosController.prototype, "downloadPhotoByPath", null);
__decorate([
    common_1.UseGuards(passport_1.AuthGuard(), roles_guard_1.RolesGuard),
    swagger_1.ApiBearerAuth(),
    common_1.Get('/getLastPhoto/:deviceId'),
    openapi.ApiResponse({ status: 200, type: require("./photo.entity").Photo }),
    __param(0, common_1.Param('deviceId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PhotosController.prototype, "getLastPhoto", null);
__decorate([
    common_1.UseGuards(passport_1.AuthGuard(), roles_guard_1.RolesGuard),
    swagger_1.ApiBearerAuth(),
    common_1.Post('/removeBatch'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, common_1.Body(common_1.ValidationPipe)),
    __param(1, get_user_decorator_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [remove_photos_dto_1.RemovePhotosDto,
        user_entity_1.User]),
    __metadata("design:returntype", Promise)
], PhotosController.prototype, "removePhotosById", null);
PhotosController = __decorate([
    swagger_1.ApiTags('Photos'),
    common_1.Controller('api/photos'),
    __metadata("design:paramtypes", [photos_service_1.PhotosService])
], PhotosController);
exports.PhotosController = PhotosController;
//# sourceMappingURL=photos.controller.js.map