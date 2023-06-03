import { MigrationInterface, QueryRunner } from "typeorm";

export class SetUuidID1685797127842 implements MigrationInterface {
    name = 'SetUuidID1685797127842'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "participants" DROP CONSTRAINT "FK_5fc9cddc801b973cd9edcdda42a"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "participants" DROP CONSTRAINT "FK_a622804301e735196918e6a47e5"`);
        await queryRunner.query(`ALTER TABLE "participants" DROP CONSTRAINT "PK_1cda06c31eec1c95b3365a0283f"`);
        await queryRunner.query(`ALTER TABLE "participants" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "participants" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "participants" ADD CONSTRAINT "PK_1cda06c31eec1c95b3365a0283f" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "participants" DROP COLUMN "eventId"`);
        await queryRunner.query(`ALTER TABLE "participants" ADD "eventId" uuid`);
        await queryRunner.query(`ALTER TABLE "participants" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "participants" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "events" DROP CONSTRAINT "PK_40731c7151fe4be3116e45ddf73"`);
        await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "events" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "events" ADD CONSTRAINT "PK_40731c7151fe4be3116e45ddf73" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "participants" ADD CONSTRAINT "FK_a622804301e735196918e6a47e5" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "participants" ADD CONSTRAINT "FK_5fc9cddc801b973cd9edcdda42a" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "participants" DROP CONSTRAINT "FK_5fc9cddc801b973cd9edcdda42a"`);
        await queryRunner.query(`ALTER TABLE "participants" DROP CONSTRAINT "FK_a622804301e735196918e6a47e5"`);
        await queryRunner.query(`ALTER TABLE "events" DROP CONSTRAINT "PK_40731c7151fe4be3116e45ddf73"`);
        await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "events" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "events" ADD CONSTRAINT "PK_40731c7151fe4be3116e45ddf73" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "participants" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "participants" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "participants" DROP COLUMN "eventId"`);
        await queryRunner.query(`ALTER TABLE "participants" ADD "eventId" integer`);
        await queryRunner.query(`ALTER TABLE "participants" DROP CONSTRAINT "PK_1cda06c31eec1c95b3365a0283f"`);
        await queryRunner.query(`ALTER TABLE "participants" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "participants" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "participants" ADD CONSTRAINT "PK_1cda06c31eec1c95b3365a0283f" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "participants" ADD CONSTRAINT "FK_a622804301e735196918e6a47e5" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "participants" ADD CONSTRAINT "FK_5fc9cddc801b973cd9edcdda42a" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
