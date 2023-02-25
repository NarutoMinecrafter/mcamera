import {
    Body,
    Controller,
    Delete,
    Get, Logger,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    UseGuards,
    ValidationPipe
} from '@nestjs/common';
import {DevicesService} from './devices.service';
import {GetUser} from '../auth/get-user.decorator';
import {User} from '../auth/user.entity';
import {Device} from './device.entity';
import {CreateDeviceDto} from './dto/create-device.dto';
import {AuthGuard} from '@nestjs/passport';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import {RolesGuard} from '../auth/roles.guard';
import {Roles} from '../auth/roles.decorator';
import {UsersService} from '../users/users.service';
import {DeviceSettingsValidationPipe} from './pipes/device-settings-validation.pipe';


@ApiTags('Devices')
@Controller('api/devices')
@UseGuards(AuthGuard(), RolesGuard)
export class DevicesController {
    private logger = new Logger('Device Controller');
    constructor(
        private devicesService: DevicesService,
        private usersService: UsersService
    ) {}

    @ApiBearerAuth()
    @Get('/:id')
    getDeviceById(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user: User
    ): Promise<Device> {
        return this.devicesService.getDeviceById(id, user);
    }

    @ApiBearerAuth()
    @Get()
    getUserDevices(
        @GetUser() user: User
    ): Promise<Device[]> {
        this.logger.verbose(`User "${user.username}" retrieving all devices.`);
        return this.devicesService.getUserDevices(user);
    }

    @ApiBearerAuth()
    @Post()
    createDevice(
        @Body(ValidationPipe, DeviceSettingsValidationPipe) createDeviceDto: CreateDeviceDto,
        @GetUser() user: User
    ): Promise<Device> {
        this.logger.verbose(`User "${user.username}" creating new device. Data: ${JSON.stringify(createDeviceDto)}`);
        return this.devicesService.createDevice(createDeviceDto, user);
    }

    @ApiBearerAuth()
    @Delete('/:id')
    deleteDevice(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user: User
    ): Promise<void> {
        return this.devicesService.deleteDevice(id, user);
    }

    @ApiBearerAuth()
    @Patch('/:id')
    updateDevice(
        @Param('id', ParseIntPipe) id: number,
        @Body(ValidationPipe, DeviceSettingsValidationPipe) createDeviceDto: CreateDeviceDto,
        @GetUser() user: User
    ): Promise<Device> {
        return this.devicesService.updateDevice(id, createDeviceDto, user);
    }

    @ApiBearerAuth()
    @Post('/admin/:userId')
    @Roles('admin')
    async createDeviceAdmin(
        @Param('userId', ParseIntPipe) userId: number,
        @Body(ValidationPipe, DeviceSettingsValidationPipe) createDeviceDto: CreateDeviceDto
    ): Promise<Device> {
        this.logger.verbose(`Admin creating new device for user-id ${userId}. Data: ${JSON.stringify(createDeviceDto)}`);
        const user = await this.usersService.getUserById(userId);
        return this.devicesService.createDevice(createDeviceDto, user);
    }

    @ApiBearerAuth()
    @Delete('/admin/:userId/:deviceId')
    @Roles('admin')
    async removeDeviceAdmin(
        @Param('userId', ParseIntPipe) userId: number,
        @Param('deviceId', ParseIntPipe) deviceId: number
    ): Promise<void> {
        this.logger.verbose(`Admin removing device for user-id ${userId}.`);
        const user = await this.usersService.getUserById(userId);
        return this.devicesService.deleteDevice(deviceId, user);
    }

    @ApiBearerAuth()
    @Post('/admin/:userId/:deviceId')
    @Roles('admin')
    async updateDeviceAdmin(
        @Param('userId', ParseIntPipe) userId: number,
        @Param('deviceId', ParseIntPipe) deviceId: number,
        @Body(ValidationPipe, DeviceSettingsValidationPipe) createDeviceDto: CreateDeviceDto
    ): Promise<Device> {
        this.logger.verbose(`Admin updating device for user-id ${userId}.`);
        const user = await this.usersService.getUserById(userId);
        return this.devicesService.updateDevice(deviceId, createDeviceDto, user);
    }
}
