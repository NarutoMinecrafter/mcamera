"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExternalApiModule = void 0;
const common_1 = require("@nestjs/common");
const external_api_controller_1 = require("./external-api.controller");
const packets_module_1 = require("../packets/packets.module");
const photos_module_1 = require("../photos/photos.module");
const devices_module_1 = require("../devices/devices.module");
const platform_express_1 = require("@nestjs/platform-express");
const socket_module_1 = require("../socket/socket.module");
let ExternalApiModule = class ExternalApiModule {
};
ExternalApiModule = __decorate([
    common_1.Module({
        imports: [
            packets_module_1.PacketsModule, photos_module_1.PhotosModule, devices_module_1.DevicesModule, socket_module_1.SocketModule,
            platform_express_1.MulterModule.register({
                dest: './upload',
                preservePath: true
            })
        ],
        controllers: [external_api_controller_1.ExternalApiController],
    })
], ExternalApiModule);
exports.ExternalApiModule = ExternalApiModule;
//# sourceMappingURL=external-api.module.js.map