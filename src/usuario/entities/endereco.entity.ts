import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Cidade } from './cidade.entity';

@Entity('endereco')
export class Endereco {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  logradouro: string;

  @Column('int')
  numero: number;

  @Column({ nullable: true })
  complemento: string;

  @Column()
  bairro: string;

  @Column()
  cep: string;

  @ManyToOne(() => Cidade, (cidade) => cidade.enderecos, { eager: true })
  @JoinColumn({ name: 'cidade' })
  cidade: Cidade;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
