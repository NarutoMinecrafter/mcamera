import { Repository } from 'typeorm';
import { Photo } from './photo.entity';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { User } from '../auth/user.entity';
export declare class PhotosRepository extends Repository<Photo> {
    private logger;
    createPhoto(createPhotoDto: CreatePhotoDto): Promise<Photo>;
    getPhotosByIdentifier(deviceId: number, user: User, start: number, end: number): Promise<Photo[]>;
}
