"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusValidationPipe = void 0;
const common_1 = require("@nestjs/common");
const status_enum_1 = require("../status.enum");
class StatusValidationPipe {
    constructor() {
        this.allowedStatuses = [
            status_enum_1.Status.NONE,
            status_enum_1.Status.SENDING,
            status_enum_1.Status.TO_SEND,
        ];
    }
    transform(value, metadata) {
        value = value.toUpperCase();
        if (!this.isStatusValid(value)) {
            throw new common_1.BadRequestException(`"${value}" is an invalid status`);
        }
        return value;
    }
    isStatusValid(status) {
        const index = this.allowedStatuses.indexOf(status);
        return index !== -1;
    }
}
exports.StatusValidationPipe = StatusValidationPipe;
//# sourceMappingURL=status-validation.pipe.js.map