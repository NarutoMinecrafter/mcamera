import {
    Body,
    Controller, Get,
    Logger,
    Param,
    ParseIntPipe,
    Post,
    UseGuards,
    ValidationPipe
} from '@nestjs/common';
import {GetUser} from '../auth/get-user.decorator';
import {User} from '../auth/user.entity';
import {AuthGuard} from '@nestjs/passport';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import {RolesGuard} from '../auth/roles.guard';
import {Roles} from '../auth/roles.decorator';
import {PermissionsService} from './permissions.service';
import {CreatePermissionDto} from './dto/create-permission.dto';
import {Permission} from './permission.entity';


@ApiTags('Permissions')
@Controller('api/permissions')
@UseGuards(AuthGuard(), RolesGuard)
export class PermissionsController {
    private logger = new Logger('Permissions Controller');
    constructor(
        private permissionsService: PermissionsService,
    ) {}

    @ApiBearerAuth()
    @Roles('admin')
    @Post('/:userId')
    updatePermissions(
        @Param('userId', ParseIntPipe) userId: number,
        @Body(ValidationPipe) createPermissionDto: CreatePermissionDto,
    ): Promise<Permission> {
        this.logger.log('start updating permissions');
        return this.permissionsService.updatePermissions(createPermissionDto, userId);
    }

    @ApiBearerAuth()
    @Get('/')
    getUserPermissions(
        @GetUser() user: User
    ): Promise<Permission> {
        return this.permissionsService.getUserPermissions(user.id);
    }
}
