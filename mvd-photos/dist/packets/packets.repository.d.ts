import { Repository } from 'typeorm';
import { Packet } from './packet.entity';
import { CreatePacketDto } from './dto/create-packet.dto';
export declare class PacketsRepository extends Repository<Packet> {
    private logger;
    createPacket(createPacketDto: CreatePacketDto): Promise<Packet>;
    getPacketByDeviceIIdentifier(identifier: string): Promise<Packet>;
}
