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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const user_repository_1 = require("./user.repository");
const permissions_service_1 = require("../permissions/permissions.service");
let AuthService = class AuthService {
    constructor(userRepository, permissionsService, jwtService) {
        this.userRepository = userRepository;
        this.permissionsService = permissionsService;
        this.jwtService = jwtService;
    }
    async signUp(authCredentialsDto, userGroupId) {
        const user = await this.userRepository.signUp(authCredentialsDto, userGroupId);
        await this.permissionsService.createPermissions({}, user.id);
    }
    async signIn(authCredentialsDto) {
        const jwtPayload = await this.userRepository.validateUserPassword(authCredentialsDto);
        if (!jwtPayload) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const payload = jwtPayload;
        const accesstoken = await this.jwtService.sign(payload);
        return { accesstoken };
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(user_repository_1.UserRepository)),
    __param(1, common_1.Inject(common_1.forwardRef(() => permissions_service_1.PermissionsService))),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        permissions_service_1.PermissionsService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map