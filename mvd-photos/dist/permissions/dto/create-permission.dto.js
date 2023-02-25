"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePermissionDto = void 0;
const openapi = require("@nestjs/swagger");
class CreatePermissionDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { addDevice: { required: true, type: () => Boolean }, removeDevice: { required: true, type: () => Boolean }, editDevice: { required: true, type: () => Boolean }, download: { required: true, type: () => Boolean }, removePhoto: { required: true, type: () => Boolean } };
    }
}
exports.CreatePermissionDto = CreatePermissionDto;
//# sourceMappingURL=create-permission.dto.js.map