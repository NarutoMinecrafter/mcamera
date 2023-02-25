"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_core_module_1 = require("@nestjs/typeorm/dist/typeorm-core.module");
const typeorm_config_1 = require("./config/typeorm.config");
const auth_module_1 = require("./auth/auth.module");
const devices_module_1 = require("./devices/devices.module");
const packets_module_1 = require("./packets/packets.module");
const socket_module_1 = require("./socket/socket.module");
const app_gateway_1 = require("./app.gateway");
const users_module_1 = require("./users/users.module");
const photos_module_1 = require("./photos/photos.module");
const user_groups_module_1 = require("./user-groups/user-groups.module");
const external_api_module_1 = require("./external-api/external-api.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_core_module_1.TypeOrmCoreModule.forRoot(typeorm_config_1.typeOrmConfig),
            auth_module_1.AuthModule,
            devices_module_1.DevicesModule,
            packets_module_1.PacketsModule,
            socket_module_1.SocketModule,
            users_module_1.UsersModule,
            photos_module_1.PhotosModule,
            external_api_module_1.ExternalApiModule,
            user_groups_module_1.UserGroupsModule,
        ],
        controllers: [],
        providers: [app_gateway_1.AppGateway],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map