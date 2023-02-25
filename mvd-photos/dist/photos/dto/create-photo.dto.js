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
exports.CreatePhotoDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const source_enum_1 = require("../source.enum");
class CreatePhotoDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { deviceId: { required: true, type: () => Number }, path: { required: true, type: () => String }, originalName: { required: true, type: () => String }, originaltime: { required: true, type: () => Number }, name: { required: true, type: () => String }, type: { required: true, type: () => String }, source: { required: true, enum: require("../source.enum").Source } };
    }
}
__decorate([
    class_validator_1.IsEnum(source_enum_1.Source),
    __metadata("design:type", String)
], CreatePhotoDto.prototype, "source", void 0);
exports.CreatePhotoDto = CreatePhotoDto;
//# sourceMappingURL=create-photo.dto.js.map