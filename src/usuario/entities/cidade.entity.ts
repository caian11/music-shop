import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Uf } from './estado.entity';
import { Endereco } from './endereco.entity';

@Entity('cidade')
export class Cidade {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nome: string;

  @ManyToOne(() => Uf, (uf) => uf.cidades, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'uf' })
  uf: Uf;

  @OneToMany(() => Endereco, (endereco) => endereco.cidade)
  enderecos: Endereco[];
}
