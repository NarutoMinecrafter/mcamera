import {IsEnum} from 'class-validator';
import {Source} from '../source.enum';

export class CreatePhotoDto {
    deviceId: number;

    path: string;

    originalName: string;

    originaltime: number;

    name: string;

    type: string;

    @IsEnum(Source)
    source: Source;
}
