"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAdmin1601194850571 = void 0;
class CreateAdmin1601194850571 {
    async up(queryRunner) {
        await queryRunner.query('DELETE FROM photo');
    }
    async down(queryRunner) {
    }
}
exports.CreateAdmin1601194850571 = CreateAdmin1601194850571;
//# sourceMappingURL=1601194850571-RemoveOldPhotos.js.map