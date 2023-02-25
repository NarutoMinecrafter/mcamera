import { EntityRepository, Repository } from 'typeorm';
import { Logger, NotFoundException } from '@nestjs/common';
import { Packet } from './packet.entity';
import { CreatePacketDto } from './dto/create-packet.dto';


@EntityRepository(Packet)
export class PacketsRepository extends Repository<Packet> {
    private logger = new Logger('Packet Repository');

    async createPacket(createPacketDto: CreatePacketDto): Promise<Packet> {

        const packet = new Packet();
        packet.deviceId = createPacketDto.deviceId;
        packet.status = createPacketDto.status;
        packet.lastPacketTime = new Date(0);
        await packet.save();

        return packet;
    }

    async getPacketByDeviceIIdentifier(identifier: string): Promise<Packet> {
        const queryBuilder = this.createQueryBuilder('packet');
        queryBuilder
            .leftJoinAndSelect('packet.device', 'device')
            .where('device.identifier=:identifier', {identifier});

        const packet = await queryBuilder.getOne();

        if (!packet) {
            throw new NotFoundException(`Packet not found`);
        }

        return packet;
    }

}
