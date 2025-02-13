import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Produto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({ nullable: true })
  marca: string;

  @Column({ nullable: true })
  categoria: string;

  @Column('decimal', { precision: 10, scale: 2 })
  preco: number;

  @Column({ type: 'int', default: 0 })
  quantidadeEstoque: number;

  @Column({ nullable: true })
  descricao?: string;

  @Column({ default: true })
  ativoo: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
