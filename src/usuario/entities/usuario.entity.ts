import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Endereco } from './endereco.entity';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nome: string;

  @Column({ unique: true, length: 150 })
  email: string;

  @Exclude()
  @Column({ select: false })
  senha: string;

  @Column({ type: 'text', nullable: true })
  access_token: string;

  @ManyToMany(() => Endereco, { cascade: true, eager: true })
  @JoinTable({
    name: 'usuario_enderecos',
    joinColumn: { name: 'usuario_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'endereco_id', referencedColumnName: 'id' },
  })
  enderecos: Endereco[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
