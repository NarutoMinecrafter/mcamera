"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PacketsRepository = void 0;
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const packet_entity_1 = require("./packet.entity");
let PacketsRepository = class PacketsRepository extends typeorm_1.Repository {
    constructor() {
        super(...arguments);
        this.logger = new common_1.Logger('Packet Repository');
    }
    async createPacket(createPacketDto) {
        const packet = new packet_entity_1.Packet();
        packet.deviceId = createPacketDto.deviceId;
        packet.status = createPacketDto.status;
        packet.lastPacketTime = new Date(0);
        await packet.save();
        return packet;
    }
    async getPacketByDeviceIIdentifier(identifier) {
        const queryBuilder = this.createQueryBuilder('packet');
        queryBuilder
            .leftJoinAndSelect('packet.device', 'device')
            .where('device.identifier=:identifier', { identifier });
        const packet = await queryBuilder.getOne();
        if (!packet) {
            throw new common_1.NotFoundException(`Packet not found`);
        }
        return packet;
    }
};
PacketsRepository = __decorate([
    typeorm_1.EntityRepository(packet_entity_1.Packet)
], PacketsRepository);
exports.PacketsRepository = PacketsRepository;
//# sourceMappingURL=packets.repository.js.map