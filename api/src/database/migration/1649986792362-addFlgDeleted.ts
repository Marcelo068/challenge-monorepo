import {MigrationInterface, QueryRunner} from "typeorm";

export class addFlgDeleted1649986792362 implements MigrationInterface {
    name = 'addFlgDeleted1649986792362'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "produto" ADD "flg_deleted" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "produto" DROP COLUMN "flg_deleted"`);
    }

}
