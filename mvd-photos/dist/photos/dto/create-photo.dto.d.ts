import { Source } from '../source.enum';
export declare class CreatePhotoDto {
    deviceId: number;
    path: string;
    originalName: string;
    originaltime: number;
    name: string;
    type: string;
    source: Source;
}
