import { Module } from "@nestjs/common";
import { UserGroupsService } from "./user-groups.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserGroupsRepository } from "./user-groups.repository";
import { UserGroupsController } from "./user-groups.controller";
import { AuthModule } from "../auth/auth.module";
import { PacketsModule } from "../packets/packets.module";
import { UsersModule } from "../users/users.module";
import { UserRepository } from "src/auth/user.repository";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserGroupsRepository, UserRepository]),
    AuthModule,
    PacketsModule,
    UsersModule,
  ],
  controllers: [UserGroupsController],
  providers: [UserGroupsService],
  exports: [UserGroupsService],
})
export class UserGroupsModule {}
