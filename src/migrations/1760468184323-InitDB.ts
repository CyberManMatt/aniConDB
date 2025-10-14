import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDB1760468184323 implements MigrationInterface {
    name = 'InitDB1760468184323'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "admission" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "validFrom" date NOT NULL, "validTo" date NOT NULL, "price" numeric(10,2) NOT NULL, "isPremium" boolean NOT NULL DEFAULT false, "isChild" boolean NOT NULL DEFAULT false, "conventionId" integer NOT NULL, CONSTRAINT "PK_6e91be345099f3da80fb2cc0d9e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "hotel" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "address1" character varying NOT NULL, "address2" character varying, "city" character varying NOT NULL, "state" character varying(2) NOT NULL, "zip" character varying(5) NOT NULL, "phone" character varying, "website" character varying, "image" character varying, "image_alt" character varying, "description" character varying, "conBlock" boolean, "reservationDeadline" TIMESTAMP NOT NULL, "reservationPage" character varying, CONSTRAINT "PK_3a62ac86b369b36c1a297e9ab26" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "vendor" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "address1" character varying, "address2" character varying, "city" character varying, "state" character varying(2), "zip" character varying(5), "phone" character varying(10), "website" character varying, "image" character varying, "image_alt" character varying, "description" text, CONSTRAINT "PK_931a23f6231a57604f5a0e32780" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "convention" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" text, "image" character varying, "image_alt" character varying, "startDate" date NOT NULL, "endDate" date NOT NULL, "webpage" character varying, "venueId" integer NOT NULL, CONSTRAINT "PK_c63491e72614dcea4f98dc22ba7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "venue" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "address1" character varying NOT NULL, "address2" character varying, "city" character varying NOT NULL, "state" character varying NOT NULL, "zip" character varying NOT NULL, "phone" character varying, "website" character varying, "foodCourt" boolean, CONSTRAINT "PK_c53deb6d1bcb088f9d459e7dbc0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "state" character varying, "city" character varying, "gender" character varying, "pronouns" text, "bio" text, "socials" text, "image" character varying, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "hotel_conventions_convention" ("hotelId" integer NOT NULL, "conventionId" integer NOT NULL, CONSTRAINT "PK_50241ec03eb412cf0658f6d7ac1" PRIMARY KEY ("hotelId", "conventionId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_5594a20329e8740b7bb731dbb7" ON "hotel_conventions_convention" ("hotelId") `);
        await queryRunner.query(`CREATE INDEX "IDX_471e75aa6d0fec6c9e1369fbae" ON "hotel_conventions_convention" ("conventionId") `);
        await queryRunner.query(`CREATE TABLE "vendor_conventions_convention" ("vendorId" integer NOT NULL, "conventionId" integer NOT NULL, CONSTRAINT "PK_c09721d96034541a9532a160f55" PRIMARY KEY ("vendorId", "conventionId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_621a3c4df30395e81a3e5be7c3" ON "vendor_conventions_convention" ("vendorId") `);
        await queryRunner.query(`CREATE INDEX "IDX_24832fbce3706b6a5cd8a96f68" ON "vendor_conventions_convention" ("conventionId") `);
        await queryRunner.query(`ALTER TABLE "admission" ADD CONSTRAINT "FK_7920ebe82ba83f42121367eb72f" FOREIGN KEY ("conventionId") REFERENCES "convention"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "convention" ADD CONSTRAINT "FK_b0d7d6a969305ca8351193eb0fc" FOREIGN KEY ("venueId") REFERENCES "venue"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "hotel_conventions_convention" ADD CONSTRAINT "FK_5594a20329e8740b7bb731dbb7e" FOREIGN KEY ("hotelId") REFERENCES "hotel"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "hotel_conventions_convention" ADD CONSTRAINT "FK_471e75aa6d0fec6c9e1369fbae3" FOREIGN KEY ("conventionId") REFERENCES "convention"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vendor_conventions_convention" ADD CONSTRAINT "FK_621a3c4df30395e81a3e5be7c3c" FOREIGN KEY ("vendorId") REFERENCES "vendor"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "vendor_conventions_convention" ADD CONSTRAINT "FK_24832fbce3706b6a5cd8a96f68c" FOREIGN KEY ("conventionId") REFERENCES "convention"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vendor_conventions_convention" DROP CONSTRAINT "FK_24832fbce3706b6a5cd8a96f68c"`);
        await queryRunner.query(`ALTER TABLE "vendor_conventions_convention" DROP CONSTRAINT "FK_621a3c4df30395e81a3e5be7c3c"`);
        await queryRunner.query(`ALTER TABLE "hotel_conventions_convention" DROP CONSTRAINT "FK_471e75aa6d0fec6c9e1369fbae3"`);
        await queryRunner.query(`ALTER TABLE "hotel_conventions_convention" DROP CONSTRAINT "FK_5594a20329e8740b7bb731dbb7e"`);
        await queryRunner.query(`ALTER TABLE "convention" DROP CONSTRAINT "FK_b0d7d6a969305ca8351193eb0fc"`);
        await queryRunner.query(`ALTER TABLE "admission" DROP CONSTRAINT "FK_7920ebe82ba83f42121367eb72f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_24832fbce3706b6a5cd8a96f68"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_621a3c4df30395e81a3e5be7c3"`);
        await queryRunner.query(`DROP TABLE "vendor_conventions_convention"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_471e75aa6d0fec6c9e1369fbae"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5594a20329e8740b7bb731dbb7"`);
        await queryRunner.query(`DROP TABLE "hotel_conventions_convention"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "venue"`);
        await queryRunner.query(`DROP TABLE "convention"`);
        await queryRunner.query(`DROP TABLE "vendor"`);
        await queryRunner.query(`DROP TABLE "hotel"`);
        await queryRunner.query(`DROP TABLE "admission"`);
    }

}
