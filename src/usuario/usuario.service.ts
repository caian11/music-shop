import { BadRequestException, Injectable } from '@nestjs/common';
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
    // Verifica se o email já está cadastrado
    const usuarioExistente = await this.usuarioRepository.findOne({ where: { email: data.email } });
    if (usuarioExistente) {
      throw new BadRequestException({
        errors: [
          { field: 'email', message: 'O email informado já está em uso.' }
        ]
      });
    }

    // Validação extra para senha (caso queira reforçar além do @MinLength)
    if (data.senha.length < 6) {
      throw new BadRequestException({
        errors: [
          { field: 'senha', message: 'A senha deve conter pelo menos 6 caracteres.' }
        ]
      });
    }

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
