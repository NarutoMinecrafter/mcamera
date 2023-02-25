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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDeviceDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const time_unit_enum_1 = require("../time-unit.enum");
class CreateDeviceDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { identifier: { required: true, type: () => String }, name: { required: true, type: () => String }, randomSymbols: { required: true, type: () => String }, scheduleFrequencyPhoto: { required: true, type: () => Number, minimum: 1, maximum: 86400 }, scheduleDurationPhoto: { required: true, type: () => Number, minimum: 1 }, scheduleFramesQuantity: { required: true, type: () => Number, minimum: 1 }, movementCells: { required: true, type: () => [String] }, movementDiffLevel: { required: true, type: () => Number, minimum: 1, maximum: 100 }, movementChangeFrameTime: { required: true, type: () => Number, minimum: 1, maximum: 1440 }, movementFrequencyAnalyzing: { required: true, type: () => Number, minimum: 1, maximum: 300 }, circleDurationBeforeMoveSensor: { required: true, type: () => Number, minimum: 0, maximum: 3600 }, circleFramesQuantityBeforeMove: { required: true, type: () => Number, minimum: 0 }, circleDurationDuringMoveSensorUnit: { required: true, enum: require("../time-unit.enum").TimeUnit }, circleDurationDuringMoveSensor: { required: true, type: () => Number, minimum: 1 }, circleFramesQuantityDuringMove: { required: true, type: () => Number, minimum: 1 }, circleDurationAfterMoveSensor: { required: true, type: () => Number, minimum: 0, maximum: 3600 }, circleFramesQuantityAfterMove: { required: true, type: () => Number, minimum: 0 } };
    }
}
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateDeviceDto.prototype, "identifier", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateDeviceDto.prototype, "name", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateDeviceDto.prototype, "randomSymbols", void 0);
__decorate([
    class_validator_1.Min(1),
    class_validator_1.Max(86400),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], CreateDeviceDto.prototype, "scheduleFrequencyPhoto", void 0);
__decorate([
    class_validator_1.Min(1),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], CreateDeviceDto.prototype, "scheduleDurationPhoto", void 0);
__decorate([
    class_validator_1.Min(1),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], CreateDeviceDto.prototype, "scheduleFramesQuantity", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsArray(),
    __metadata("design:type", Array)
], CreateDeviceDto.prototype, "movementCells", void 0);
__decorate([
    class_validator_1.Min(1),
    class_validator_1.Max(100),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], CreateDeviceDto.prototype, "movementDiffLevel", void 0);
__decorate([
    class_validator_1.Min(1),
    class_validator_1.Max(1440),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], CreateDeviceDto.prototype, "movementChangeFrameTime", void 0);
__decorate([
    class_validator_1.Min(1),
    class_validator_1.Max(300),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], CreateDeviceDto.prototype, "movementFrequencyAnalyzing", void 0);
__decorate([
    class_validator_1.Min(0),
    class_validator_1.Max(3600),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], CreateDeviceDto.prototype, "circleDurationBeforeMoveSensor", void 0);
__decorate([
    class_validator_1.Min(0),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], CreateDeviceDto.prototype, "circleFramesQuantityBeforeMove", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsEnum(time_unit_enum_1.TimeUnit),
    __metadata("design:type", String)
], CreateDeviceDto.prototype, "circleDurationDuringMoveSensorUnit", void 0);
__decorate([
    class_validator_1.Min(1),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], CreateDeviceDto.prototype, "circleDurationDuringMoveSensor", void 0);
__decorate([
    class_validator_1.Min(1),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], CreateDeviceDto.prototype, "circleFramesQuantityDuringMove", void 0);
__decorate([
    class_validator_1.Min(0),
    class_validator_1.Max(3600),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], CreateDeviceDto.prototype, "circleDurationAfterMoveSensor", void 0);
__decorate([
    class_validator_1.Min(0),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], CreateDeviceDto.prototype, "circleFramesQuantityAfterMove", void 0);
exports.CreateDeviceDto = CreateDeviceDto;
//# sourceMappingURL=create-device.dto.js.map