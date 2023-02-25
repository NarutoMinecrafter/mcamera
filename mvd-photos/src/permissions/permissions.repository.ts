import { EntityRepository, Repository } from 'typeorm';
import {Logger, NotFoundException} from '@nestjs/common';
import {CreatePermissionDto} from './dto/create-permission.dto';
import {Permission} from './permission.entity';


@EntityRepository(Permission)
export class PermissionsRepository extends Repository<Permission> {
    private logger = new Logger('Permission Repository');

    async createPermissions(createPermissionDto: CreatePermissionDto, userId: number): Promise<Permission> {

        const permission = new Permission();
        permission.userId = userId;
        permission.addDevice = createPermissionDto.addDevice;
        permission.removeDevice = createPermissionDto.removeDevice;
        permission.editDevice = createPermissionDto.editDevice;
        permission.download = createPermissionDto.download;
        permission.removePhoto = createPermissionDto.removePhoto;

        await permission.save();
        this.logger.log('Create Permissions');
        return permission;
    }

    async updatePermissions(createPermissionDto: CreatePermissionDto, userId: number): Promise<Permission> {
        const perm = await this.findOne({where: {
            userId
        }});
        Object.assign(perm, createPermissionDto);
        await perm.save();
        this.logger.log('Update Permissions');
        return perm;
    }

    async getUserPermissions(userId: number): Promise<Permission> {
        const queryBuilder = this.createQueryBuilder('permission');
        queryBuilder.where('"userId"=:userId', {userId});
        const permission = await queryBuilder.getOne();
        if (!permission) {
            throw new NotFoundException(`Permission not found`);
        }

        return permission;
    }
}
