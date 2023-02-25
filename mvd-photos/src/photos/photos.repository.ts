import { EntityRepository, Repository } from 'typeorm';
import { InternalServerErrorException, Logger } from '@nestjs/common';
import { Photo } from './photo.entity';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { User } from '../auth/user.entity';


@EntityRepository(Photo)
export class PhotosRepository extends Repository<Photo> {
    private logger = new Logger('Photos Repository');

    async createPhoto(createPhotoDto: CreatePhotoDto): Promise<Photo> {

        const photo = new Photo();
        photo.deviceId = createPhotoDto.deviceId;
        photo.originalName = createPhotoDto.originalName;
        photo.path = createPhotoDto.path;
        photo.source = createPhotoDto.source;
        photo.type = createPhotoDto.type;
        photo.name = createPhotoDto.name;
        photo.originaltime = createPhotoDto.originaltime.toString();
        await photo.save();

        return photo;
    }

    async getPhotosByIdentifier(deviceId: number, user: User, start: number, end: number): Promise<Photo[]> {
        const queryBuilder = this.createQueryBuilder('photo')
            .leftJoinAndSelect('photo.device', 'device');
        queryBuilder
            .where('photo.deviceId = :deviceId AND photo.originaltime > :start AND photo.originaltime < :end', {
                start, end, deviceId, userId: user.id
            });
        queryBuilder.addOrderBy('photo.originaltime', 'DESC');

        try {
            return await queryBuilder.getMany();
        } catch (err) {
            this.logger.error(`Failed to get Devices for Device "${deviceId}"`, err.stack);
            throw new InternalServerErrorException();
        }
    }
}
