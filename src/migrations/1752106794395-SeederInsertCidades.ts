// src/migrations/1699540000000-ImportAllCidadesWithExtraColumn.ts
import { MigrationInterface, QueryRunner } from 'typeorm';

export class ImportAllCidadesWithExtraColumn1699540000000
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    // 1) cria tabela temporária com 10 colunas para casar com o CSV original
    await queryRunner.query(`
      CREATE TABLE municipios_tmp (
                                    concatufmun      TEXT,
                                    ibge             TEXT,
                                    ibge7            TEXT,
                                    uf_sigla         VARCHAR(2),
                                    nome_municipio   VARCHAR(100),
                                    regiao           TEXT,
                                    populacao_2010   TEXT,
                                    porte            TEXT,
                                    capital          TEXT,
                                    formula          TEXT
      );
    `);

    // 2) importa do CSV montado em /municipios.csv no container Docker
    await queryRunner.query(`
      COPY municipios_tmp
      FROM '/municipios.csv'
      WITH (
        FORMAT csv,
        DELIMITER ';',
        HEADER true,
        ENCODING 'LATIN1'
      );
    `);

    // 3) insere apenas nome e uf (id correspondente)
    await queryRunner.query(`
      INSERT INTO cidade (nome, uf)
      SELECT nome_municipio,
             (SELECT id FROM uf WHERE sigla = uf_sigla)
      FROM municipios_tmp
      WHERE uf_sigla IS NOT NULL
        AND nome_municipio IS NOT NULL;
    `);

    // 4) descarta a tabela de staging
    await queryRunner.query(`DROP TABLE municipios_tmp;`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM cidade;`);
  }
}
