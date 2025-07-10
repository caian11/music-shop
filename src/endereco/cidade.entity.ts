import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Uf } from './estado.entity';

@Entity('cidade')
export class Cidade {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nome: string;

  @ManyToOne(() => Uf, (uf) => uf.cidades, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'uf' })
  uf: Uf;
}
