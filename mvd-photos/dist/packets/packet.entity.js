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
exports.Packet = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const device_entity_1 = require("../devices/device.entity");
const status_enum_1 = require("./status.enum");
let Packet = class Packet extends typeorm_1.BaseEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, status: { required: true, enum: require("./status.enum").Status }, device: { required: true, type: () => require("../devices/device.entity").Device }, deviceId: { required: true, type: () => Number }, lastPacketTime: { required: true, type: () => Date } };
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Packet.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Packet.prototype, "status", void 0);
__decorate([
    typeorm_1.OneToOne(() => device_entity_1.Device, device => device.packet, { eager: true, onDelete: 'CASCADE' }),
    typeorm_1.JoinColumn(),
    __metadata("design:type", device_entity_1.Device)
], Packet.prototype, "device", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Packet.prototype, "deviceId", void 0);
__decorate([
    typeorm_1.Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Packet.prototype, "lastPacketTime", void 0);
Packet = __decorate([
    typeorm_1.Entity()
], Packet);
exports.Packet = Packet;
//# sourceMappingURL=packet.entity.js.map