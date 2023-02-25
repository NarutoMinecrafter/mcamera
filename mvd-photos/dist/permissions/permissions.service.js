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
exports.PermissionsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const permissions_repository_1 = require("./permissions.repository");
let PermissionsService = class PermissionsService {
    constructor(permissionsRepository) {
        this.permissionsRepository = permissionsRepository;
    }
    async createPermissions({ addDevice = false, removeDevice = false, editDevice = false, download = false, removePhoto = false }, userId) {
        return this.permissionsRepository.createPermissions({
            addDevice,
            removeDevice,
            editDevice,
            download,
            removePhoto
        }, userId);
    }
    async updatePermissions(createPermissionDto, userId) {
        return this.permissionsRepository.updatePermissions(createPermissionDto, userId);
    }
    async getUserPermissions(userId) {
        return this.permissionsRepository.getUserPermissions(userId);
    }
};
PermissionsService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(permissions_repository_1.PermissionsRepository)),
    __metadata("design:paramtypes", [permissions_repository_1.PermissionsRepository])
], PermissionsService);
exports.PermissionsService = PermissionsService;
//# sourceMappingURL=permissions.service.js.map