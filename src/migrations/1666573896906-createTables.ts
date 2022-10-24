import { MigrationInterface, QueryRunner } from "typeorm";

export class createTables1666573896906 implements MigrationInterface {
    name = 'createTables1666573896906'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "properties" DROP CONSTRAINT "FK_a82b56d3d456c30b8c630cba0c6"`);
        await queryRunner.query(`ALTER TABLE "properties" RENAME COLUMN "categoryId" TO "categoryIId"`);
        await queryRunner.query(`ALTER TABLE "properties" ADD CONSTRAINT "FK_a86d08712abd93f02ce03409ecf" FOREIGN KEY ("categoryIId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "properties" DROP CONSTRAINT "FK_a86d08712abd93f02ce03409ecf"`);
        await queryRunner.query(`ALTER TABLE "properties" RENAME COLUMN "categoryIId" TO "categoryId"`);
        await queryRunner.query(`ALTER TABLE "properties" ADD CONSTRAINT "FK_a82b56d3d456c30b8c630cba0c6" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
