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
exports.PhotosService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const moment = require("moment");
const fs = require("fs");
const photos_repository_1 = require("./photos.repository");
let PhotosService = class PhotosService {
    constructor(photosRepository) {
        this.photosRepository = photosRepository;
    }
    async createPhoto(createPhotoDto) {
        return this.photosRepository.createPhoto(createPhotoDto);
    }
    async getPhotosByIdentifier(deviceId, user, start, end) {
        return this.photosRepository.getPhotosByIdentifier(deviceId, user, start, end);
    }
    async removePhotoById(id) {
        try {
            const photo = await this.photosRepository.findOne(id);
            try {
                await fs.unlinkSync(photo.path);
            }
            catch (e) {
            }
            await this.photosRepository.delete({ id });
        }
        catch (e) {
            throw new common_1.InternalServerErrorException(e);
        }
    }
    async removePhotosById(ids) {
        try {
            await Promise.all([ids.map(id => this.removePhotoById(id))]);
        }
        catch (e) {
            throw new common_1.InternalServerErrorException(e);
        }
    }
    async getLastPhoto(deviceId) {
        const allPhotos = await this.photosRepository.find({
            where: {
                deviceId
            },
            order: {
                originaltime: 'DESC'
            }
        });
        return allPhotos[0];
    }
    async getPhotoName(name) {
        const photo = await this.photosRepository.findOne({
            where: {
                name
            }
        });
        if (!photo) {
            throw new common_1.InternalServerErrorException();
        }
        const dayLoad = new Date(+photo.originaltime);
        dayLoad.setHours(dayLoad.getHours() + 3);
        const ext = photo.originalName.split('.')[1];
        const newName = `${photo.source}_${moment(dayLoad).format('DD-MM-YYYY | HH:mm:ss')}`
            .replace(/(\/)|(-)|(,)/g, '_')
            .replace(/(:)/g, '-');
        return [newName, ext].filter(Boolean).join('.');
    }
};
PhotosService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(photos_repository_1.PhotosRepository)),
    __metadata("design:paramtypes", [photos_repository_1.PhotosRepository])
], PhotosService);
exports.PhotosService = PhotosService;
//# sourceMappingURL=photos.service.js.map