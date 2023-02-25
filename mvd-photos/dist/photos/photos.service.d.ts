import { PhotosRepository } from './photos.repository';
import { Photo } from './photo.entity';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { User } from '../auth/user.entity';
export declare class PhotosService {
    private photosRepository;
    constructor(photosRepository: PhotosRepository);
    createPhoto(createPhotoDto: CreatePhotoDto): Promise<Photo>;
    getPhotosByIdentifier(deviceId: number, user: User, start: number, end: number): Promise<Photo[]>;
    removePhotoById(id: number): Promise<void>;
    removePhotosById(ids: number[]): Promise<void>;
    getLastPhoto(deviceId: number): Promise<Photo>;
    getPhotoName(name: string): Promise<string>;
}
