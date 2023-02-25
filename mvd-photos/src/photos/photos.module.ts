import {Module} from '@nestjs/common';
import {PhotosService} from './photos.service';
import {PhotosController} from './photos.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {PhotosRepository} from './photos.repository';
import {AuthModule} from '../auth/auth.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([PhotosRepository]),
        AuthModule,
    ],
    providers: [PhotosService],
    controllers: [PhotosController],
    exports: [PhotosService]
})
export class PhotosModule {
}
