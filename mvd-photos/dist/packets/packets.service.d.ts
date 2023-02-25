import { PacketsRepository } from './packets.repository';
import { CreatePacketDto } from './dto/create-packet.dto';
import { Packet } from './packet.entity';
import { Status } from './status.enum';
export declare class PacketsService {
    private packetsRepository;
    constructor(packetsRepository: PacketsRepository);
    getPacketById(id: number): Promise<Packet>;
    getPacketByDeviceIIdentifier(identifier: string): Promise<Packet>;
    createPacket(createPacketDto: CreatePacketDto): Promise<Packet>;
    updatePacketStatus(id: number, status: Status): Promise<Packet>;
    updatePacketUpdateTime(id: number, newValue: Date): Promise<Packet>;
}
