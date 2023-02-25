"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const user_entity_1 = require("./user.entity");
const errors_1 = require("../constants/errors");
let UserRepository = class UserRepository extends typeorm_1.Repository {
    async signUp(authCredentialsDto, userGroupsId) {
        const user = new user_entity_1.User();
        user.userGroupsId = userGroupsId;
        return this.saveUser(user, authCredentialsDto);
    }
    async saveUser(user, authCredentialsDto) {
        const { username, password, isAdmin } = authCredentialsDto;
        user.username = username.toLowerCase();
        user.salt = await bcrypt.genSalt();
        user.password = await this.hashPassword(password, user.salt);
        user.isAdmin = isAdmin === undefined ? false : isAdmin;
        try {
            await user.save();
            return user;
        }
        catch (error) {
            if (error.code === errors_1.Errors.DuplicateEntry) {
                throw new common_1.ConflictException('Username already exists');
            }
            else {
                throw new common_1.InternalServerErrorException();
            }
        }
    }
    async validateUserPassword(authCredentialsDto) {
        const { username, password } = authCredentialsDto;
        const user = await this.findOne({ username: username.toLowerCase() });
        if (user && await user.validatePassword(password)) {
            return {
                username: user.username,
                isAdmin: user.isAdmin
            };
        }
        else {
            return null;
        }
    }
    async hashPassword(password, salt) {
        return bcrypt.hash(password, salt);
    }
    async getUsersWithDevices() {
        const queryBuilder = this.createQueryBuilder('user');
        queryBuilder.leftJoinAndSelect('user.permission', 'permission');
        queryBuilder.leftJoinAndSelect('user.userGroups', 'userGroups');
        queryBuilder.leftJoinAndSelect('userGroups.devices', 'devices');
        queryBuilder.leftJoinAndSelect('userGroups.users', 'users');
        queryBuilder.addOrderBy('user.username');
        queryBuilder.addOrderBy('devices.id');
        queryBuilder.leftJoinAndSelect('devices.packet', 'packet');
        try {
            return await queryBuilder.getMany();
        }
        catch (err) {
            throw new common_1.InternalServerErrorException();
        }
    }
};
UserRepository = __decorate([
    typeorm_1.EntityRepository(user_entity_1.User)
], UserRepository);
exports.UserRepository = UserRepository;
//# sourceMappingURL=user.repository.js.map