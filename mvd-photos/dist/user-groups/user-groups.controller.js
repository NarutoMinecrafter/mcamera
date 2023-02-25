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
exports.UserGroupsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
const roles_guard_1 = require("../auth/roles.guard");
const roles_decorator_1 = require("../auth/roles.decorator");
const user_groups_service_1 = require("./user-groups.service");
let UserGroupsController = class UserGroupsController {
    constructor(userGroupsService) {
        this.userGroupsService = userGroupsService;
        this.logger = new common_1.Logger('UserGroup Controller');
    }
    getUserGroups() {
        return this.userGroupsService.getUserGroups();
    }
    deleteUserGroup(userGroupId) {
        return this.userGroupsService.deleteUserGroup(userGroupId);
    }
    createUserGroup() {
        return this.userGroupsService.createUserGroup();
    }
};
__decorate([
    common_1.UseGuards(passport_1.AuthGuard(), roles_guard_1.RolesGuard),
    swagger_1.ApiBearerAuth(),
    roles_decorator_1.Roles('admin'),
    common_1.Get('/admin'),
    openapi.ApiResponse({ status: 200, type: [require("./user-groups.entity").UserGroups] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserGroupsController.prototype, "getUserGroups", null);
__decorate([
    common_1.UseGuards(passport_1.AuthGuard(), roles_guard_1.RolesGuard),
    swagger_1.ApiBearerAuth(),
    roles_decorator_1.Roles('admin'),
    common_1.Delete('/admin/:userGroupId'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, common_1.Param('userGroupId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserGroupsController.prototype, "deleteUserGroup", null);
__decorate([
    common_1.UseGuards(passport_1.AuthGuard(), roles_guard_1.RolesGuard),
    swagger_1.ApiBearerAuth(),
    roles_decorator_1.Roles('admin'),
    common_1.Post('/admin'),
    openapi.ApiResponse({ status: 201, type: require("./user-groups.entity").UserGroups }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserGroupsController.prototype, "createUserGroup", null);
UserGroupsController = __decorate([
    swagger_1.ApiTags('UserGroup'),
    common_1.Controller('api/userGroup'),
    common_1.UseGuards(passport_1.AuthGuard(), roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [user_groups_service_1.UserGroupsService])
], UserGroupsController);
exports.UserGroupsController = UserGroupsController;
//# sourceMappingURL=user-groups.controller.js.map