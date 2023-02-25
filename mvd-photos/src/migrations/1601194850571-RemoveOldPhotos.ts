import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateAdmin1601194850571 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DELETE FROM photo');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
