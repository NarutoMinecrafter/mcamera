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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Permission = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../auth/user.entity");
let Permission = class Permission extends typeorm_1.BaseEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, addDevice: { required: true, type: () => Boolean }, removeDevice: { required: true, type: () => Boolean }, editDevice: { required: true, type: () => Boolean }, download: { required: true, type: () => Boolean }, removePhoto: { required: true, type: () => Boolean }, user: { required: true, type: () => require("../auth/user.entity").User }, userId: { required: true, type: () => Number } };
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Permission.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], Permission.prototype, "addDevice", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], Permission.prototype, "removeDevice", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], Permission.prototype, "editDevice", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], Permission.prototype, "download", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], Permission.prototype, "removePhoto", void 0);
__decorate([
    typeorm_1.OneToOne(() => user_entity_1.User, user => user.permission, { eager: true, onDelete: 'CASCADE' }),
    typeorm_1.JoinColumn(),
    __metadata("design:type", user_entity_1.User)
], Permission.prototype, "user", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Permission.prototype, "userId", void 0);
Permission = __decorate([
    typeorm_1.Entity()
], Permission);
exports.Permission = Permission;
//# sourceMappingURL=permission.entity.js.map