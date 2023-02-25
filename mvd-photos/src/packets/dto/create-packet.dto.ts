import {IsEnum, IsNumber} from 'class-validator';
import {Status} from '../status.enum';

export class CreatePacketDto {
    @IsNumber()
    deviceId: number;

    @IsEnum(Status)
    status: Status;
}