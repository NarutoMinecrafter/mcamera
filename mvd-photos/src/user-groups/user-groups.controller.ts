import {
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { RolesGuard } from "../auth/roles.guard";
import { Roles } from "../auth/roles.decorator";
import { UserGroups } from "./user-groups.entity";
import { UserGroupsService } from "./user-groups.service";

@ApiTags("UserGroup")
@Controller("api/userGroup")
@UseGuards(AuthGuard(), RolesGuard)
export class UserGroupsController {
  constructor(private userGroupsService: UserGroupsService) {}

  private logger = new Logger("UserGroup Controller");

  @UseGuards(AuthGuard(), RolesGuard)
  @ApiBearerAuth()
  @Roles("admin")
  @Get("/admin")
  getUserGroups(): Promise<UserGroups[]> {
    return this.userGroupsService.getUserGroups();
  }

  @UseGuards(AuthGuard(), RolesGuard)
  @ApiBearerAuth()
  @Roles("admin")
  @Delete("/admin/:userGroupId")
  deleteUserGroup(
    @Param("userGroupId", ParseIntPipe) userGroupId: number
  ): Promise<void> {
    return this.userGroupsService.deleteUserGroup(userGroupId);
  }

  @UseGuards(AuthGuard(), RolesGuard)
  @ApiBearerAuth()
  @Roles("admin")
  @Post("/admin")
  createUserGroup(
    @Param("userId", ParseIntPipe) userId: number
  ): Promise<UserGroups> {
    return this.userGroupsService.createUserGroup(userId);
  }
}
