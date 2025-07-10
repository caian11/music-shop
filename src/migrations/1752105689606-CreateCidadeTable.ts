import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateCidadeTable1699500000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // 1) Cria a tabela cidade
    await queryRunner.createTable(
      new Table({
        name: 'cidade',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'nome',
            type: 'varchar',
            length: '100',
            isNullable: false,
          },
          {
            name: 'uf',
            type: 'int',
            isNullable: false,
          },
        ],
      }),
      true,
    );

    // 2) Adiciona a FK para uf(id)
    await queryRunner.createForeignKey(
      'cidade',
      new TableForeignKey({
        columnNames: ['uf'],
        referencedTableName: 'uf',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // 1) Remove a FK
    const table = await queryRunner.getTable('cidade');
    const fk = table.foreignKeys.find((fk) => fk.columnNames.includes('uf_id'));
    await queryRunner.dropForeignKey('cidade', fk);

    // 2) Drop da tabela
    await queryRunner.dropTable('cidade');
  }
}
