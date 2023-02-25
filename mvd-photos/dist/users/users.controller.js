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
exports.UsersController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
const roles_guard_1 = require("../auth/roles.guard");
const roles_decorator_1 = require("../auth/roles.decorator");
const users_service_1 = require("./users.service");
const auth_credentials_dto_1 = require("../auth/dto/auth-credentials.dto");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
        this.logger = new common_1.Logger('UserAdmin Controller');
    }
    getUsersWithDevices() {
        this.logger.verbose(`Admin retrieving all devices.`);
        return this.usersService.getUsersWithDevices();
    }
    removeUser(userId) {
        this.logger.verbose(`Admin removing user with ${userId}.`);
        return this.usersService.removeUser(userId);
    }
    editUser(userId, authCredentialsDto) {
        return this.usersService.editUser(userId, authCredentialsDto);
    }
};
__decorate([
    swagger_1.ApiBearerAuth(),
    common_1.Get(),
    roles_decorator_1.Roles('admin'),
    openapi.ApiResponse({ status: 200, type: [require("../auth/user.entity").User] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUsersWithDevices", null);
__decorate([
    swagger_1.ApiBearerAuth(),
    common_1.Delete('/:userId'),
    roles_decorator_1.Roles('admin'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, common_1.Param('userId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "removeUser", null);
__decorate([
    swagger_1.ApiBearerAuth(),
    common_1.Post('/:userId'),
    roles_decorator_1.Roles('admin'),
    openapi.ApiResponse({ status: 201, type: require("../auth/user.entity").User }),
    __param(0, common_1.Param('userId', common_1.ParseIntPipe)),
    __param(1, common_1.Body(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, auth_credentials_dto_1.AuthCredentialsDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "editUser", null);
UsersController = __decorate([
    swagger_1.ApiTags('UsersAdmin'),
    common_1.Controller('api/admin/users'),
    common_1.UseGuards(passport_1.AuthGuard(), roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map