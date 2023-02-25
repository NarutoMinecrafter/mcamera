import {
    Body,
    Controller, Delete,
    Get,
    Param, ParseIntPipe, Post, Query, Res,
    UseGuards, ValidationPipe
} from '@nestjs/common';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import { Response } from 'express';
import {PhotosService} from './photos.service';
import {AuthGuard} from '@nestjs/passport';
import {RolesGuard} from '../auth/roles.guard';
import {GetUser} from '../auth/get-user.decorator';
import {User} from '../auth/user.entity';
import {Photo} from './photo.entity';
import {RemovePhotosDto} from './dto/remove-photos.dto';


@ApiTags('Photos')
@Controller('api/photos')
export class PhotosController {

    constructor(private photosService: PhotosService) {}

    @UseGuards(AuthGuard(), RolesGuard)
    @ApiBearerAuth()
    @Get('/:deviceId')
    getPhotosById(
        @Param('deviceId', ParseIntPipe) deviceId: number,
        @Query('start', ParseIntPipe) start: number,
        @Query('end', ParseIntPipe) end: number,
        @GetUser() user: User
    ): Promise<Photo[]> {
        return this.photosService.getPhotosByIdentifier(deviceId, user, start, end);
    }

    @UseGuards(AuthGuard(), RolesGuard)
    @ApiBearerAuth()
    @Delete('/:id')
    removePhotoById(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user: User
    ): Promise<void> {
        return this.photosService.removePhotoById(id);
    }

    @Get('/preview/:imageName')
    getPhotoByPath(
        @Param('imageName') imageName: string,
        @Res() res: Response
    ): void {
        return res.sendFile(imageName,  {root: 'upload'});
    }

    @Get('/download/:imageName')
    async downloadPhotoByPath(
        @Param('imageName') imageName: string,
        @Res() res: Response
    ): Promise<void> {
        const newName = await this.photosService.getPhotoName(imageName);
        return res.download(`./upload/${imageName}`, newName);
    }

    @UseGuards(AuthGuard(), RolesGuard)
    @ApiBearerAuth()
    @Get('/getLastPhoto/:deviceId')
    getLastPhoto(
        @Param('deviceId', ParseIntPipe) deviceId: number,
    ): Promise<Photo> {
        return this.photosService.getLastPhoto(deviceId);
    }

    @UseGuards(AuthGuard(), RolesGuard)
    @ApiBearerAuth()
    @Post('/removeBatch')
    removePhotosById(
        @Body(ValidationPipe) removePhotosDto: RemovePhotosDto,
        @GetUser() user: User
    ): Promise<void> {
        return this.photosService.removePhotosById(removePhotosDto.ids);
    }
}
