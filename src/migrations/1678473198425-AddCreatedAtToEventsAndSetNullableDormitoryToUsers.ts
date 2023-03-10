import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCreatedAtToEventsAndSetNullableDormitoryToUsers1678473198425 implements MigrationInterface {
    name = 'AddCreatedAtToEventsAndSetNullableDormitoryToUsers1678473198425'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "events" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "dormitory" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "dormitory" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "created_at"`);
    }

}
