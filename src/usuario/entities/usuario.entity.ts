import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nome: string;

  @Column({ unique: true, length: 150 })
  email: string;

  @Column()
  senha: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
