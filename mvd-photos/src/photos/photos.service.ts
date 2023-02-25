import {Injectable, InternalServerErrorException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import * as moment from 'moment';
import * as fs from 'fs';
import {PhotosRepository} from './photos.repository';
import {Photo} from './photo.entity';
import {CreatePhotoDto} from './dto/create-photo.dto';
import {User} from '../auth/user.entity';

@Injectable()
export class PhotosService {
    constructor(
        @InjectRepository(PhotosRepository)
        private photosRepository: PhotosRepository
    ) {
    }

    async createPhoto(createPhotoDto: CreatePhotoDto): Promise<Photo> {
        return this.photosRepository.createPhoto(createPhotoDto);
    }

    async getPhotosByIdentifier(deviceId: number, user: User, start: number, end: number): Promise<Photo[]> {
        return this.photosRepository.getPhotosByIdentifier(deviceId, user, start, end);
    }

    async removePhotoById(id: number): Promise<void> {
        try {
            const photo = await this.photosRepository.findOne(id);
            try {
                await fs.unlinkSync(photo.path);
            } catch (e) {

            }
            await this.photosRepository.delete({id});
        } catch (e) {
            throw new InternalServerErrorException(e);
        }
    }

    async removePhotosById(ids: number[]): Promise<void> {
        try {
            await Promise.all([ids.map(id => this.removePhotoById(id))]);
        } catch (e) {
            throw new InternalServerErrorException(e);
        }
    }

    async getLastPhoto(deviceId: number): Promise<Photo> {
        const allPhotos = await this.photosRepository.find({
            where: {
                deviceId
            },
            order: {
                originaltime: 'DESC'
            }
        });
        return allPhotos[0];
    }

    async getPhotoName(name: string): Promise<string> {
        const photo = await this.photosRepository.findOne({
            where: {
                name
            }
        });
        if (!photo) {
            throw new InternalServerErrorException();
        }

        const dayLoad = new Date(+photo.originaltime);
        dayLoad.setHours(dayLoad.getHours() + 3)
        const ext = photo.originalName.split('.')[1];
        const newName = `${photo.source}_${moment(dayLoad).format('DD-MM-YYYY | HH:mm:ss')}`
            .replace(/(\/)|(-)|(,)/g, '_')
            .replace(/(:)/g, '-');
        return [newName, ext].filter(Boolean).join('.');
    }
}
