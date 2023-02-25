/// <reference types="multer" />
import { DevicesService } from '../devices/devices.service';
import { PacketsService } from '../packets/packets.service';
import { PhotosService } from '../photos/photos.service';
import { CreateDeviceDto } from '../devices/dto/create-device.dto';
import { Source } from '../photos/source.enum';
import { SocketService } from '../socket/socket.service';
export declare class ExternalApiController {
    private photosService;
    private devicesService;
    private packetsService;
    private socketService;
    private logger;
    constructor(photosService: PhotosService, devicesService: DevicesService, packetsService: PacketsService, socketService: SocketService);
    uploadFile(file: Express.Multer.File, identifier: string, source: Source): Promise<CreateDeviceDto>;
    check(identifier: string, battery: number): Promise<CreateDeviceDto>;
}
