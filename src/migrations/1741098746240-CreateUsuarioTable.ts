import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsuarioTable1741098746240 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "usuarios" (
        "id" SERIAL PRIMARY KEY,
        "nome" character varying(100) NOT NULL,
        "email" character varying(150) NOT NULL,
        "senha" text NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "UQ_usuarios_email" UNIQUE ("email")
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "usuarios"`);
  }
}
