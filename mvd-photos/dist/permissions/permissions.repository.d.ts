import { Repository } from 'typeorm';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { Permission } from './permission.entity';
export declare class PermissionsRepository extends Repository<Permission> {
    private logger;
    createPermissions(createPermissionDto: CreatePermissionDto, userId: number): Promise<Permission>;
    updatePermissions(createPermissionDto: CreatePermissionDto, userId: number): Promise<Permission>;
    getUserPermissions(userId: number): Promise<Permission>;
}
