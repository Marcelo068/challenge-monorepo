import {MigrationInterface, QueryRunner} from "typeorm";

export class firstMigration1649985509122 implements MigrationInterface {
    name = 'firstMigration1649985509122'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "produto" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying(40) NOT NULL, "preco" double precision NOT NULL, "quantidade" integer NOT NULL, "descricao" character varying(100) NOT NULL, "created_date" TIMESTAMP NOT NULL DEFAULT now(), "updated_date" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_99c4351f9168c50c0736e6a66be" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "produto"`);
    }

}
