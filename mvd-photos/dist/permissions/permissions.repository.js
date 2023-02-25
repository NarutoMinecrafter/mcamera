"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionsRepository = void 0;
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const permission_entity_1 = require("./permission.entity");
let PermissionsRepository = class PermissionsRepository extends typeorm_1.Repository {
    constructor() {
        super(...arguments);
        this.logger = new common_1.Logger('Permission Repository');
    }
    async createPermissions(createPermissionDto, userId) {
        const permission = new permission_entity_1.Permission();
        permission.userId = userId;
        permission.addDevice = createPermissionDto.addDevice;
        permission.removeDevice = createPermissionDto.removeDevice;
        permission.editDevice = createPermissionDto.editDevice;
        permission.download = createPermissionDto.download;
        permission.removePhoto = createPermissionDto.removePhoto;
        await permission.save();
        this.logger.log('Create Permissions');
        return permission;
    }
    async updatePermissions(createPermissionDto, userId) {
        const perm = await this.findOne({ where: {
                userId
            } });
        Object.assign(perm, createPermissionDto);
        await perm.save();
        this.logger.log('Update Permissions');
        return perm;
    }
    async getUserPermissions(userId) {
        const queryBuilder = this.createQueryBuilder('permission');
        queryBuilder.where('"userId"=:userId', { userId });
        const permission = await queryBuilder.getOne();
        if (!permission) {
            throw new common_1.NotFoundException(`Permission not found`);
        }
        return permission;
    }
};
PermissionsRepository = __decorate([
    typeorm_1.EntityRepository(permission_entity_1.Permission)
], PermissionsRepository);
exports.PermissionsRepository = PermissionsRepository;
//# sourceMappingURL=permissions.repository.js.map