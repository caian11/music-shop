import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { Usuario } from './entities/usuario.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  async create(data: CreateUsuarioDto): Promise<Usuario> {
    const usuario = this.usuarioRepository.create(data);
    return this.usuarioRepository.save(usuario);
  }

  async findAll(): Promise<Usuario[]> {
    return this.usuarioRepository.find();
  }

  async findOne(id: number): Promise<Usuario> {
    return this.usuarioRepository.findOne({ where: { id } });
  }

  async update(id: number, data: Partial<CreateUsuarioDto>): Promise<Usuario> {
    await this.usuarioRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.usuarioRepository.delete(id);
  }
}
