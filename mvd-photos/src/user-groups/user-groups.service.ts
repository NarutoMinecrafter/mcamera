import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserGroupsRepository } from "./user-groups.repository";
import { UserGroups } from "./user-groups.entity";
import { UserRepository } from "src/auth/user.repository";

@Injectable()
export class UserGroupsService {
  constructor(
    @InjectRepository(UserGroupsRepository)
    private userGroupsRepository: UserGroupsRepository,
    @InjectRepository(UserRepository)
    private userRepository: UserRepository
  ) {}

  async getUserGroups(): Promise<UserGroups[]> {
    return this.userGroupsRepository.getUserGroups();
  }

  async deleteUserGroup(userGroupId: number): Promise<void> {
    try {
      await this.userGroupsRepository.delete({ id: userGroupId });
    } catch (e) {
      if (e.code === "23503") {
        throw new ConflictException("Cannot delete Group with users.");
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async createUserGroup(userId: number): Promise<UserGroups> {
    const user = await this.userRepository.findOne(userId);
    return this.userGroupsRepository.createUserGroup(user);
  }
}
