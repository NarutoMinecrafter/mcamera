import { PermissionsRepository } from './permissions.repository';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { Permission } from './permission.entity';
export declare class PermissionsService {
    private permissionsRepository;
    constructor(permissionsRepository: PermissionsRepository);
    createPermissions({ addDevice, removeDevice, editDevice, download, removePhoto }: Partial<CreatePermissionDto>, userId: number): Promise<Permission>;
    updatePermissions(createPermissionDto: CreatePermissionDto, userId: number): Promise<Permission>;
    getUserPermissions(userId: number): Promise<Permission>;
}
