import { User } from '../auth/user.entity';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { Permission } from './permission.entity';
export declare class PermissionsController {
    private permissionsService;
    private logger;
    constructor(permissionsService: PermissionsService);
    updatePermissions(userId: number, createPermissionDto: CreatePermissionDto): Promise<Permission>;
    getUserPermissions(user: User): Promise<Permission>;
}
