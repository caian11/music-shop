import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCategoriaTable1740011801952 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "categoria" (
        "id" SERIAL PRIMARY KEY,
        "nome" VARCHAR NOT NULL,
        "ativo" BOOLEAN NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now()
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "categoria"`);
  }
}
