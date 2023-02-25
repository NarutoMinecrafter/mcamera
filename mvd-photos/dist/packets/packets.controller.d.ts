import { Status } from './status.enum';
import { Packet } from './packet.entity';
import { PacketsService } from './packets.service';
export declare class PacketsController {
    private packetsService;
    constructor(packetsService: PacketsService);
    updatePacketStatus(id: number, status: Status): Promise<Packet>;
    getPacketByDeviceIIdentifier({ data }: {
        data: number;
    }): Promise<Packet>;
}
