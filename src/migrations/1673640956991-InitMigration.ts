import { MigrationInterface, QueryRunner } from "typeorm";

export class InitMigration1673640956991 implements MigrationInterface {
    name = 'InitMigration1673640956991'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "events" ("id" SERIAL NOT NULL, "image" character varying NOT NULL, "title" character varying NOT NULL, "description" text NOT NULL, "event_place" character varying NOT NULL, "people_need" integer NOT NULL, "people_joined" integer NOT NULL, "status" character varying NOT NULL, "start_at" TIMESTAMP NOT NULL, "gender" character varying NOT NULL, CONSTRAINT "PK_40731c7151fe4be3116e45ddf73" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "participants" ("id" SERIAL NOT NULL, "role" character varying NOT NULL, "eventId" integer, "userId" integer, CONSTRAINT "PK_1cda06c31eec1c95b3365a0283f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "password" character varying NOT NULL, "email" character varying NOT NULL, "gender" character varying NOT NULL, "group" character varying NOT NULL, "dormitory" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "participants" ADD CONSTRAINT "FK_a622804301e735196918e6a47e5" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "participants" ADD CONSTRAINT "FK_5fc9cddc801b973cd9edcdda42a" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "participants" DROP CONSTRAINT "FK_5fc9cddc801b973cd9edcdda42a"`);
        await queryRunner.query(`ALTER TABLE "participants" DROP CONSTRAINT "FK_a622804301e735196918e6a47e5"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "participants"`);
        await queryRunner.query(`DROP TABLE "events"`);
    }

}
