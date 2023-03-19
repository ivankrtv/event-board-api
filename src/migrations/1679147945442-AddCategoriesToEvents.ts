import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCategoriesToEvents1679147945442 implements MigrationInterface {
    name = 'AddCategoriesToEvents1679147945442'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "events" ADD "category" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "events" ADD "mood" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "events" ADD "dormitory" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "dormitory"`);
        await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "mood"`);
        await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "category"`);
    }

}
