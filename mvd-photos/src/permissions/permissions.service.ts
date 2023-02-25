import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {PermissionsRepository} from './permissions.repository';
import {CreatePermissionDto} from './dto/create-permission.dto';
import {Permission} from './permission.entity';

@Injectable()
export class PermissionsService {
    constructor(
        @InjectRepository(PermissionsRepository)
        private permissionsRepository: PermissionsRepository
    ) {}

    async createPermissions(
        {
            addDevice = false,
            removeDevice = false,
            editDevice = false,
            download = false,
            removePhoto = false
        }: Partial<CreatePermissionDto>,
        userId: number
    ): Promise<Permission> {
        return this.permissionsRepository.createPermissions({
            addDevice,
            removeDevice,
            editDevice,
            download,
            removePhoto
        }, userId);
    }

    async updatePermissions(createPermissionDto: CreatePermissionDto, userId: number): Promise<Permission> {
        return this.permissionsRepository.updatePermissions(createPermissionDto, userId);
    }

    async getUserPermissions(userId: number): Promise<Permission> {
        return this.permissionsRepository.getUserPermissions(userId);
    }
}
