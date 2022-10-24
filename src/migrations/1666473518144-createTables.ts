import { MigrationInterface, QueryRunner } from "typeorm";

export class createTables1666473518144 implements MigrationInterface {
    name = 'createTables1666473518144'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" ALTER COLUMN "name" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" ALTER COLUMN "name" DROP NOT NULL`);
    }

}
