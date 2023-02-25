"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemovePhotosDto = void 0;
const openapi = require("@nestjs/swagger");
class RemovePhotosDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { ids: { required: true, type: () => [Number] } };
    }
}
exports.RemovePhotosDto = RemovePhotosDto;
//# sourceMappingURL=remove-photos.dto.js.map