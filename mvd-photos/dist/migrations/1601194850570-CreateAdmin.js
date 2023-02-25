"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAdmin1601194850570 = void 0;
class CreateAdmin1601194850570 {
    async up(queryRunner) {
        await queryRunner.query(`
                    INSERT INTO "user_groups" DEFAULT VALUES;
                    INSERT INTO "user" (username, password, "isAdmin", salt, "userGroupsId")
                    VALUES
                        ('admin', '$2b$10$78Walb03CFjG4GPPnAuQg.KVGJcmKIZhM5zoiUvV4GQEx4EndFZdm', true, '$2b$10$78Walb03CFjG4GPPnAuQg.', CURRVAL('user_groups_id_seq'));

                    INSERT INTO "permission" ("addDevice", "removeDevice", "editDevice", download, "removePhoto", "userId")
                    VALUES 
                        (false, false, false, false, false, CURRVAL('user_id_seq'));
            `);
    }
    async down(queryRunner) {
    }
}
exports.CreateAdmin1601194850570 = CreateAdmin1601194850570;
//# sourceMappingURL=1601194850570-CreateAdmin.js.map