import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateAdmin1601194850570 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `
                    INSERT INTO "user_groups" DEFAULT VALUES;
                    INSERT INTO "user" (username, password, "isAdmin", salt, "userGroupsId")
                    VALUES
                        ('admin', '$2b$10$78Walb03CFjG4GPPnAuQg.KVGJcmKIZhM5zoiUvV4GQEx4EndFZdm', true, '$2b$10$78Walb03CFjG4GPPnAuQg.', CURRVAL('user_groups_id_seq'));

                    INSERT INTO "permission" ("addDevice", "removeDevice", "editDevice", download, "removePhoto", "userId")
                    VALUES 
                        (false, false, false, false, false, CURRVAL('user_id_seq'));
            `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
