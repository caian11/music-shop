import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Produto } from '../../produto/entities/produto.entity';

@Entity()
export class Pedido {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal', { precision: 10, scale: 2 })
  valor: number;

  @Column({ type: 'date' })
  data: string;

  @Column()
  formaPagamento: string;

  @Column()
  status: string;

  @Column()
  numero: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => Produto)
  @JoinTable({
    name: 'pedido_produto',
    joinColumn: {
      name: 'pedido_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'produto_id',
      referencedColumnName: 'id',
    },
  })
  produtos: Produto[];
}
