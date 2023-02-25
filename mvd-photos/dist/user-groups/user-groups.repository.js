"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserGroupsRepository = void 0;
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const user_groups_entity_1 = require("./user-groups.entity");
let UserGroupsRepository = class UserGroupsRepository extends typeorm_1.Repository {
    constructor() {
        super(...arguments);
        this.logger = new common_1.Logger('UserGroups Repository');
    }
    async getUserGroups() {
        const queryBuilder = this.createQueryBuilder('user_groups');
        queryBuilder.leftJoinAndSelect('user_groups.users', 'users');
        queryBuilder.leftJoinAndSelect('user_groups.devices', 'devices');
        queryBuilder.leftJoinAndSelect('users.permission', 'permission');
        queryBuilder.addOrderBy('user_groups.id');
        try {
            return await queryBuilder.getMany();
        }
        catch (err) {
            this.logger.error('Failed to get UserGroups for user', err.stack);
            throw new common_1.InternalServerErrorException();
        }
    }
    async createUserGroup() {
        const userGroup = new user_groups_entity_1.UserGroups();
        await userGroup.save();
        userGroup.users = [];
        userGroup.devices = [];
        return userGroup;
    }
};
UserGroupsRepository = __decorate([
    typeorm_1.EntityRepository(user_groups_entity_1.UserGroups)
], UserGroupsRepository);
exports.UserGroupsRepository = UserGroupsRepository;
//# sourceMappingURL=user-groups.repository.js.map