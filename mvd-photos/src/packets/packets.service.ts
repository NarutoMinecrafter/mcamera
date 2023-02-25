import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {PacketsRepository} from './packets.repository';
import {CreatePacketDto} from './dto/create-packet.dto';
import {Packet} from './packet.entity';
import {validate} from 'class-validator';
import {Status} from './status.enum';

@Injectable()
export class PacketsService {
    constructor(
        @InjectRepository(PacketsRepository)
        private packetsRepository: PacketsRepository
    ) {}

    async getPacketById(id: number): Promise<Packet> {
        const found = await this.packetsRepository.findOne(id);

        if (!found) {
            throw new NotFoundException(`Packet with id "${id}" not found`);
        }

        return found;
    }

    async getPacketByDeviceIIdentifier(identifier: string): Promise<Packet> {
        return this.packetsRepository.getPacketByDeviceIIdentifier(identifier);
    }

    async createPacket(createPacketDto: CreatePacketDto): Promise<Packet> {
        const result = await validate(createPacketDto)

        return this.packetsRepository.createPacket(createPacketDto);
    }

    async updatePacketStatus(id: number, status: Status): Promise<Packet> {
        const packet = await this.getPacketById(id);
        packet.status = status;
        packet.lastPacketTime = new Date();
        await packet.save();
        return packet;
    }

    async updatePacketUpdateTime(id: number, newValue: Date): Promise<Packet> {
        const packet = await this.getPacketById(id);
        packet.lastPacketTime = newValue;
        await packet.save();
        return packet;
    }
}
