"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhotosModule = void 0;
const common_1 = require("@nestjs/common");
const photos_service_1 = require("./photos.service");
const photos_controller_1 = require("./photos.controller");
const typeorm_1 = require("@nestjs/typeorm");
const photos_repository_1 = require("./photos.repository");
const auth_module_1 = require("../auth/auth.module");
let PhotosModule = class PhotosModule {
};
PhotosModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([photos_repository_1.PhotosRepository]),
            auth_module_1.AuthModule,
        ],
        providers: [photos_service_1.PhotosService],
        controllers: [photos_controller_1.PhotosController],
        exports: [photos_service_1.PhotosService]
    })
], PhotosModule);
exports.PhotosModule = PhotosModule;
//# sourceMappingURL=photos.module.js.map