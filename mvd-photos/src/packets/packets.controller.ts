import {Body, Controller, Param, ParseIntPipe, Patch} from '@nestjs/common';
import {Status} from './status.enum';
import {StatusValidationPipe} from './pipes/status-validation.pipe';
import {Packet} from './packet.entity';
import {PacketsService} from './packets.service';
import {MessagePattern} from '@nestjs/microservices';
import {ApiTags} from '@nestjs/swagger';


@ApiTags('Packets')
@Controller('api/packets')
export class PacketsController {

    constructor(private packetsService: PacketsService) {}

    @Patch('/:id/status')
    updatePacketStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', StatusValidationPipe) status: Status
    ): Promise<Packet> {
        return this.packetsService.updatePacketStatus(id, status);
    }

    @MessagePattern('get-packet-by-ident')
    getPacketByDeviceIIdentifier({data}: {data: number}): Promise<Packet> {
        return this.packetsService.getPacketByDeviceIIdentifier(data.toString());
    }
}
