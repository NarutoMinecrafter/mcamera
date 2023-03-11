import { EntityRepository, Repository } from "typeorm";
import { InternalServerErrorException, Logger } from "@nestjs/common";
import { UserGroups } from "./user-groups.entity";

@EntityRepository(UserGroups)
export class UserGroupsRepository extends Repository<UserGroups> {
  private logger = new Logger("UserGroups Repository");

  async getUserGroups(userId: number): Promise<UserGroups[]> {
    const queryBuilder = this.createQueryBuilder("user_groups");

    queryBuilder.leftJoinAndSelect("user_groups.users", "users");
    queryBuilder.leftJoinAndSelect("user_groups.devices", "devices");
    queryBuilder.leftJoinAndSelect("users.permission", "permission");
    queryBuilder.addOrderBy("user_groups.id");

    queryBuilder.where((qb) => {
      const subQuery = qb
        .subQuery()
        .select("user_groups.id")
        .from(UserGroups, "user_groups")
        .leftJoin("user_groups.users", "users")
        .where("users.id = :userId", { userId })
        .getQuery();
      return "user_groups.id IN " + subQuery;
    });

    // Check if the user is in a group with id = 1
    const userGroups = await queryBuilder.getMany();
    const isUserInGroup1 = userGroups.some((group) => group.id === 1);

    if (isUserInGroup1) {
      return await this.createQueryBuilder("user_groups")
        .leftJoinAndSelect("user_groups.users", "users")
        .leftJoinAndSelect("user_groups.devices", "devices")
        .leftJoinAndSelect("users.permission", "permission")
        .addOrderBy("user_groups.id")
        .getMany();
    }

    return userGroups;
  }

  async createUserGroup(): Promise<UserGroups> {
    const userGroup = new UserGroups();
    await userGroup.save();
    userGroup.users = [];
    userGroup.devices = [];
    return userGroup;
  }
}
