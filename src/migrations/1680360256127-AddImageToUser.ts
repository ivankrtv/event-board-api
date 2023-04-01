import { MigrationInterface, QueryRunner } from "typeorm";

export class AddImageToUser1680360256127 implements MigrationInterface {
    name = 'AddImageToUser1680360256127'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "image" jsonb`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "image"`);
    }

}
