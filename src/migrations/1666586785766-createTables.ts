import { MigrationInterface, QueryRunner } from "typeorm";

export class createTables1666586785766 implements MigrationInterface {
    name = 'createTables1666586785766'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "properties" DROP CONSTRAINT "FK_26a719ca228cd83b596b68bb3ca"`);
        await queryRunner.query(`ALTER TABLE "properties" RENAME COLUMN "addressesId" TO "addressId"`);
        await queryRunner.query(`ALTER TABLE "properties" ADD CONSTRAINT "FK_2b2211958ef1f0e3c680339100e" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "properties" DROP CONSTRAINT "FK_2b2211958ef1f0e3c680339100e"`);
        await queryRunner.query(`ALTER TABLE "properties" RENAME COLUMN "addressId" TO "addressesId"`);
        await queryRunner.query(`ALTER TABLE "properties" ADD CONSTRAINT "FK_26a719ca228cd83b596b68bb3ca" FOREIGN KEY ("addressesId") REFERENCES "addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
