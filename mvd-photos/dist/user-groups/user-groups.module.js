"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserGroupsModule = void 0;
const common_1 = require("@nestjs/common");
const user_groups_service_1 = require("./user-groups.service");
const typeorm_1 = require("@nestjs/typeorm");
const user_groups_repository_1 = require("./user-groups.repository");
const user_groups_controller_1 = require("./user-groups.controller");
const auth_module_1 = require("../auth/auth.module");
const packets_module_1 = require("../packets/packets.module");
const users_module_1 = require("../users/users.module");
let UserGroupsModule = class UserGroupsModule {
};
UserGroupsModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([user_groups_repository_1.UserGroupsRepository]),
            auth_module_1.AuthModule,
            packets_module_1.PacketsModule,
            users_module_1.UsersModule
        ],
        controllers: [user_groups_controller_1.UserGroupsController],
        providers: [user_groups_service_1.UserGroupsService],
        exports: [user_groups_service_1.UserGroupsService]
    })
], UserGroupsModule);
exports.UserGroupsModule = UserGroupsModule;
//# sourceMappingURL=user-groups.module.js.map