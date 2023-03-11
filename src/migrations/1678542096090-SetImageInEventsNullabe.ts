import { MigrationInterface, QueryRunner } from "typeorm";

export class SetImageInEventsNullabe1678542096090 implements MigrationInterface {
    name = 'SetImageInEventsNullabe1678542096090'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "events" ALTER COLUMN "image" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "events" ALTER COLUMN "image" SET NOT NULL`);
    }

}
