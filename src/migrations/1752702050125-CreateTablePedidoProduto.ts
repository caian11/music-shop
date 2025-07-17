import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreatePedidoProdutoTable1612318975383
  implements MigrationInterface
{
  name = 'CreatePedidoProdutoTable1612318975383';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'pedido_produto',
        columns: [
          {
            name: 'pedido_id',
            type: 'int',
            isPrimary: true,
          },
          {
            name: 'produto_id',
            type: 'int',
            isPrimary: true,
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'pedido_produto',
      new TableForeignKey({
        columnNames: ['pedido_id'],
        referencedTableName: 'pedido',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'pedido_produto',
      new TableForeignKey({
        columnNames: ['produto_id'],
        referencedTableName: 'produto',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('pedido_produto');
    const foreignKeyPedido = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('pedido_id') !== -1,
    );
    const foreignKeyProduto = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('produto_id') !== -1,
    );

    if (foreignKeyPedido) {
      await queryRunner.dropForeignKey('pedido_produto', foreignKeyPedido);
    }

    if (foreignKeyProduto) {
      await queryRunner.dropForeignKey('pedido_produto', foreignKeyProduto);
    }

    await queryRunner.dropTable('pedido_produto');
  }
}
