"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiFile = void 0;
const swagger_1 = require("@nestjs/swagger");
const ApiFile = (fileName = 'file') => (target, propertyKey, descriptor) => {
    swagger_1.ApiBody({
        schema: {
            type: 'object',
            properties: {
                [fileName]: {
                    type: 'string',
                    format: 'binary'
                }
            }
        }
    })(target, propertyKey, descriptor);
};
exports.ApiFile = ApiFile;
//# sourceMappingURL=api-file.decorator.js.map