import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateUsuarioEnderecosTable1680000000001
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'usuario_enderecos',
        columns: [
          {
            name: 'usuario_id',
            type: 'integer',
            isPrimary: true,
          },
          {
            name: 'endereco_id',
            type: 'integer',
            isPrimary: true,
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'usuario_enderecos',
      new TableForeignKey({
        columnNames: ['usuario_id'],
        referencedTableName: 'usuarios',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'usuario_enderecos',
      new TableForeignKey({
        columnNames: ['endereco_id'],
        referencedTableName: 'endereco',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('usuario_enderecos');
  }
}
