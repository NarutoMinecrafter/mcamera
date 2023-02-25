import {
    Body,
    Controller,
    Delete,
    Get,
    Logger,
    Param,
    ParseIntPipe,
    Post,
    UseGuards,
    ValidationPipe
} from '@nestjs/common';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import {AuthGuard} from '@nestjs/passport';
import {RolesGuard} from '../auth/roles.guard';
import {Roles} from '../auth/roles.decorator';
import {User} from '../auth/user.entity';
import {UsersService} from './users.service';
import {AuthCredentialsDto} from '../auth/dto/auth-credentials.dto';


@ApiTags('UsersAdmin')
@Controller('api/admin/users')
@UseGuards(AuthGuard(), RolesGuard)
export class UsersController {
    private logger = new Logger('UserAdmin Controller');
    constructor(private usersService: UsersService) {}

    @ApiBearerAuth()
    @Get()
    @Roles('admin')
    getUsersWithDevices(): Promise<User[]> {
        this.logger.verbose(`Admin retrieving all devices.`);
        return this.usersService.getUsersWithDevices();
    }

    @ApiBearerAuth()
    @Delete('/:userId')
    @Roles('admin')
    removeUser(@Param('userId', ParseIntPipe) userId: number): Promise<void> {
        this.logger.verbose(`Admin removing user with ${userId}.`);
        return this.usersService.removeUser(userId);
    }

    @ApiBearerAuth()
    @Post('/:userId')
    @Roles('admin')
    editUser(
        @Param('userId', ParseIntPipe) userId: number,
        @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto
    ): Promise<User> {
        return this.usersService.editUser(userId, authCredentialsDto);
    }
}
