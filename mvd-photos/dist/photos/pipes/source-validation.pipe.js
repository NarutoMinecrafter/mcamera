"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SourceValidationPipe = void 0;
const common_1 = require("@nestjs/common");
const source_enum_1 = require("../source.enum");
class SourceValidationPipe {
    constructor() {
        this.allowedStatuses = [
            source_enum_1.Source.BeforeMotion,
            source_enum_1.Source.MotionDetected,
            source_enum_1.Source.Scheduled,
            source_enum_1.Source.EndOfMotion,
        ];
    }
    transform(value, metadata) {
        if (!this.isSourceValid(value)) {
            throw new common_1.BadRequestException(`"${value}" is an invalid source`);
        }
        return value;
    }
    isSourceValid(status) {
        const index = this.allowedStatuses.indexOf(status);
        return index !== -1;
    }
}
exports.SourceValidationPipe = SourceValidationPipe;
//# sourceMappingURL=source-validation.pipe.js.map