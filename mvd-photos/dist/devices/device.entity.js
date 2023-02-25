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
exports.Device = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const packet_entity_1 = require("../packets/packet.entity");
const time_unit_enum_1 = require("./time-unit.enum");
const photo_entity_1 = require("../photos/photo.entity");
const user_groups_entity_1 = require("../user-groups/user-groups.entity");
let Device = class Device extends typeorm_1.BaseEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, identifier: { required: true, type: () => String }, name: { required: true, type: () => String }, battery: { required: true, type: () => Number }, randomSymbols: { required: true, type: () => String }, scheduleFrequencyPhoto: { required: true, type: () => Number }, scheduleDurationPhoto: { required: true, type: () => Number }, scheduleFramesQuantity: { required: true, type: () => Number }, movementCells: { required: true, type: () => [String] }, movementDiffLevel: { required: true, type: () => Number }, movementChangeFrameTime: { required: true, type: () => Number }, movementFrequencyAnalyzing: { required: true, type: () => Number }, circleDurationBeforeMoveSensor: { required: true, type: () => Number }, circleFramesQuantityBeforeMove: { required: true, type: () => Number }, circleDurationDuringMoveSensorUnit: { required: true, enum: require("./time-unit.enum").TimeUnit }, circleDurationDuringMoveSensor: { required: true, type: () => Number }, circleFramesQuantityDuringMove: { required: true, type: () => Number }, circleDurationAfterMoveSensor: { required: true, type: () => Number }, circleFramesQuantityAfterMove: { required: true, type: () => Number }, userGroups: { required: true, type: () => require("../user-groups/user-groups.entity").UserGroups }, userGroupsId: { required: true, type: () => Number }, packet: { required: true, type: () => require("../packets/packet.entity").Packet }, photo: { required: true, type: () => require("../photos/photo.entity").Photo } };
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Device.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Device.prototype, "identifier", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Device.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], Device.prototype, "battery", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Device.prototype, "randomSymbols", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Device.prototype, "scheduleFrequencyPhoto", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Device.prototype, "scheduleDurationPhoto", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Device.prototype, "scheduleFramesQuantity", void 0);
__decorate([
    typeorm_1.Column('varchar', { array: true }),
    __metadata("design:type", Array)
], Device.prototype, "movementCells", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Device.prototype, "movementDiffLevel", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Device.prototype, "movementChangeFrameTime", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Device.prototype, "movementFrequencyAnalyzing", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Device.prototype, "circleDurationBeforeMoveSensor", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Device.prototype, "circleFramesQuantityBeforeMove", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Device.prototype, "circleDurationDuringMoveSensorUnit", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Device.prototype, "circleDurationDuringMoveSensor", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Device.prototype, "circleFramesQuantityDuringMove", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Device.prototype, "circleDurationAfterMoveSensor", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Device.prototype, "circleFramesQuantityAfterMove", void 0);
__decorate([
    typeorm_1.ManyToOne(() => user_groups_entity_1.UserGroups, userGroup => userGroup.devices, { eager: false, onDelete: 'CASCADE' }),
    __metadata("design:type", user_groups_entity_1.UserGroups)
], Device.prototype, "userGroups", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Device.prototype, "userGroupsId", void 0);
__decorate([
    typeorm_1.OneToOne(() => packet_entity_1.Packet, packet => packet.device, { eager: false, onDelete: 'CASCADE' }),
    __metadata("design:type", packet_entity_1.Packet)
], Device.prototype, "packet", void 0);
__decorate([
    typeorm_1.OneToMany(() => photo_entity_1.Photo, photo => photo.device, { eager: false, onDelete: 'CASCADE' }),
    __metadata("design:type", photo_entity_1.Photo)
], Device.prototype, "photo", void 0);
Device = __decorate([
    typeorm_1.Entity(),
    typeorm_1.Unique(['identifier'])
], Device);
exports.Device = Device;
//# sourceMappingURL=device.entity.js.map