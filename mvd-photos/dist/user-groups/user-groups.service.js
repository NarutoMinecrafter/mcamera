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
exports.UserGroupsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_groups_repository_1 = require("./user-groups.repository");
let UserGroupsService = class UserGroupsService {
    constructor(userGroupsRepository) {
        this.userGroupsRepository = userGroupsRepository;
    }
    async getUserGroups() {
        return this.userGroupsRepository.getUserGroups();
    }
    async deleteUserGroup(userGroupId) {
        try {
            await this.userGroupsRepository.delete({ id: userGroupId });
        }
        catch (e) {
            if (e.code === '23503') {
                throw new common_1.ConflictException('Cannot delete Group with users.');
            }
            else {
                throw new common_1.InternalServerErrorException();
            }
        }
    }
    async createUserGroup() {
        return this.userGroupsRepository.createUserGroup();
    }
};
UserGroupsService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(user_groups_repository_1.UserGroupsRepository)),
    __metadata("design:paramtypes", [user_groups_repository_1.UserGroupsRepository])
], UserGroupsService);
exports.UserGroupsService = UserGroupsService;
//# sourceMappingURL=user-groups.service.js.map