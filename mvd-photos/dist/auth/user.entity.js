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
exports.User = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const bcrypt = require("bcrypt");
const permission_entity_1 = require("../permissions/permission.entity");
const user_groups_entity_1 = require("../user-groups/user-groups.entity");
let User = class User extends typeorm_1.BaseEntity {
    async validatePassword(password) {
        const hash = await bcrypt.hash(password, this.salt);
        return hash === this.password;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, username: { required: true, type: () => String }, password: { required: true, type: () => String }, isAdmin: { required: true, type: () => Boolean }, salt: { required: true, type: () => String }, permission: { required: true, type: () => require("../permissions/permission.entity").Permission }, userGroups: { required: true, type: () => require("../user-groups/user-groups.entity").UserGroups }, userGroupsId: { required: true, type: () => Number } };
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], User.prototype, "isAdmin", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], User.prototype, "salt", void 0);
__decorate([
    typeorm_1.OneToOne(() => permission_entity_1.Permission, perm => perm.user, { eager: false, onDelete: 'CASCADE' }),
    __metadata("design:type", permission_entity_1.Permission)
], User.prototype, "permission", void 0);
__decorate([
    typeorm_1.ManyToOne(() => user_groups_entity_1.UserGroups, userGroup => userGroup.users, { eager: false }),
    __metadata("design:type", user_groups_entity_1.UserGroups)
], User.prototype, "userGroups", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], User.prototype, "userGroupsId", void 0);
User = __decorate([
    typeorm_1.Entity(),
    typeorm_1.Unique(['username'])
], User);
exports.User = User;
//# sourceMappingURL=user.entity.js.map