import { Response } from 'express';
import { PhotosService } from './photos.service';
import { User } from '../auth/user.entity';
import { Photo } from './photo.entity';
import { RemovePhotosDto } from './dto/remove-photos.dto';
export declare class PhotosController {
    private photosService;
    constructor(photosService: PhotosService);
    getPhotosById(deviceId: number, start: number, end: number, user: User): Promise<Photo[]>;
    removePhotoById(id: number, user: User): Promise<void>;
    getPhotoByPath(imageName: string, res: Response): void;
    downloadPhotoByPath(imageName: string, res: Response): Promise<void>;
    getLastPhoto(deviceId: number): Promise<Photo>;
    removePhotosById(removePhotosDto: RemovePhotosDto, user: User): Promise<void>;
}
