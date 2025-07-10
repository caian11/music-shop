import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedUfTable1699480060000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            INSERT INTO uf (nome, sigla) VALUES
            ('Acre','AC'),
            ('Alagoas','AL'),
            ('Amapá','AP'),
            ('Amazonas','AM'),
            ('Bahia','BA'),
            ('Ceará','CE'),
            ('Distrito Federal','DF'),
            ('Espírito Santo','ES'),
            ('Goiás','GO'),
            ('Maranhão','MA'),
            ('Mato Grosso','MT'),
            ('Mato Grosso do Sul','MS'),
            ('Minas Gerais','MG'),
            ('Pará','PA'),
            ('Paraíba','PB'),
            ('Paraná','PR'),
            ('Pernambuco','PE'),
            ('Piauí','PI'),
            ('Rio de Janeiro','RJ'),
            ('Rio Grande do Norte','RN'),
            ('Rio Grande do Sul','RS'),
            ('Rondônia','RO'),
            ('Roraima','RR'),
            ('Santa Catarina','SC'),
            ('São Paulo','SP'),
            ('Sergipe','SE'),
            ('Tocantins','TO');
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM uf;`);
  }
}
