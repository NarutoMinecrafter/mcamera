import {Controller, Get, Logger, Param, ParseIntPipe, Post, Query, UploadedFile, UseInterceptors} from '@nestjs/common';
import {ApiFile} from '../photos/api-file.decorator';
import {FileInterceptor} from '@nestjs/platform-express';
import {ApiConsumes, ApiQuery, ApiTags} from '@nestjs/swagger';
import {DevicesService} from '../devices/devices.service';
import {PacketsService} from '../packets/packets.service';
import {PhotosService} from '../photos/photos.service';
import {createSettingsPacket} from './helpers/createSettingsPacket';
import {CreateDeviceDto} from '../devices/dto/create-device.dto';
import {Source} from '../photos/source.enum';
import {SourceValidationPipe} from '../photos/pipes/source-validation.pipe';
import {SocketService} from '../socket/socket.service';
import {Status} from '../packets/status.enum';


@ApiTags('ExternalApi')
@Controller('external-api')
export class ExternalApiController {
    private logger = new Logger('External Api Controller');
    constructor(
        private photosService: PhotosService,
        private devicesService: DevicesService,
        private packetsService: PacketsService,
        private socketService: SocketService
    ) {}

    @Post('/:identifier/upload')
    @ApiConsumes('multipart/form-data')
    @ApiFile()
    @ApiQuery({ name: 'source', enum: Source })
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(
        @UploadedFile() file: Express.Multer.File,
        @Param('identifier') identifier: string,
        @Query('source', SourceValidationPipe) source: Source,
    ): Promise<CreateDeviceDto> {
        this.logger.log('Uploading Photo');
        const device = await this.devicesService.getDeviceByIdentifier(identifier);
        this.photosService.createPhoto({
            deviceId: device.id,
            originalName: file.originalname,
            path: file.path,
            type: file.mimetype,
            name: file.filename,
            originaltime: +(file.originalname.split('.')[0]),
            source
        });
        return createSettingsPacket(device);
    }

    @Get('/:identifier/settings')
    async check(
        @Param('identifier') identifier: string,
        @Query('battery', ParseIntPipe) battery: number
    ): Promise<CreateDeviceDto> {
        this.logger.log(`Check - ${identifier}`);
        const device = await this.devicesService.getDeviceByIdentifier(identifier);
        await this.devicesService.updateDeviceBattery(device, battery);
        device.packet = await this.packetsService.updatePacketStatus(device.packet.id, Status.NONE);
        this.socketService.send('RECEIVED_SETTINGS', device);
        return createSettingsPacket(device);
    }
}
