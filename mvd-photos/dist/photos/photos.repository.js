"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhotosRepository = void 0;
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const photo_entity_1 = require("./photo.entity");
let PhotosRepository = class PhotosRepository extends typeorm_1.Repository {
    constructor() {
        super(...arguments);
        this.logger = new common_1.Logger('Photos Repository');
    }
    async createPhoto(createPhotoDto) {
        const photo = new photo_entity_1.Photo();
        photo.deviceId = createPhotoDto.deviceId;
        photo.originalName = createPhotoDto.originalName;
        photo.path = createPhotoDto.path;
        photo.source = createPhotoDto.source;
        photo.type = createPhotoDto.type;
        photo.name = createPhotoDto.name;
        photo.originaltime = createPhotoDto.originaltime.toString();
        await photo.save();
        return photo;
    }
    async getPhotosByIdentifier(deviceId, user, start, end) {
        const queryBuilder = this.createQueryBuilder('photo')
            .leftJoinAndSelect('photo.device', 'device');
        queryBuilder
            .where('photo.deviceId = :deviceId AND photo.originaltime > :start AND photo.originaltime < :end', {
            start, end, deviceId, userId: user.id
        });
        queryBuilder.addOrderBy('photo.originaltime', 'DESC');
        try {
            return await queryBuilder.getMany();
        }
        catch (err) {
            this.logger.error(`Failed to get Devices for Device "${deviceId}"`, err.stack);
            throw new common_1.InternalServerErrorException();
        }
    }
};
PhotosRepository = __decorate([
    typeorm_1.EntityRepository(photo_entity_1.Photo)
], PhotosRepository);
exports.PhotosRepository = PhotosRepository;
//# sourceMappingURL=photos.repository.js.map