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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_repository_1 = require("../auth/user.repository");
let UsersService = class UsersService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async getUsersWithDevices() {
        return this.userRepository.getUsersWithDevices();
    }
    async getUserById(id) {
        const found = await this.userRepository.findOne(id);
        if (!found) {
            throw new common_1.NotFoundException(`User with id "${id}" not found`);
        }
        return found;
    }
    async removeUser(id) {
        const user = await this.userRepository.findOne({ id });
        if ((user === null || user === void 0 ? void 0 : user.username) === 'admin') {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.CONFLICT,
                error: 'Неможливо видалити Системного Адміна!'
            }, common_1.HttpStatus.CONFLICT);
        }
        try {
            await this.userRepository.delete({ id });
        }
        catch (e) {
            if (e.code === '23503') {
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.CONFLICT,
                    error: 'Неможливо видалити користувача з активними пристроями. Видаліть пристрої спочатку.'
                }, common_1.HttpStatus.CONFLICT);
            }
            throw new common_1.InternalServerErrorException(e);
        }
    }
    async editUser(id, authCredentialsDto) {
        const user = await this.getUserById(id);
        if ((user === null || user === void 0 ? void 0 : user.username) === 'admin') {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.CONFLICT,
                error: 'Неможливо редагувати Системного Адміна!'
            }, common_1.HttpStatus.CONFLICT);
        }
        return this.userRepository.saveUser(user, authCredentialsDto);
    }
};
UsersService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(user_repository_1.UserRepository)),
    __metadata("design:paramtypes", [user_repository_1.UserRepository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map