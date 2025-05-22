import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  async create(data: CreateUsuarioDto): Promise<Usuario> {
    const exist = await this.usuarioRepository.findOne({
      where: { email: data.email },
    });
    if (exist) {
      throw new BadRequestException({
        errors: [{ field: 'email', message: 'E-mail já em uso.' }],
      });
    }

    const hash = await bcrypt.hash(data.senha, 10);
    const usuario = this.usuarioRepository.create({
      ...data,
      senha: hash,
    });
    return this.usuarioRepository.save(usuario);
  }

  async findAll(): Promise<Usuario[]> {
    return this.usuarioRepository.find();
  }

  async findOne(id: number): Promise<Usuario> {
    return this.usuarioRepository.findOne({ where: { id } });
  }

  async findByEmail(email: string, opts?: { withPassword: boolean }) {
    if (opts?.withPassword) {
      return this.usuarioRepository
        .createQueryBuilder('u')
        .addSelect('u.senha')
        .where('u.email = :email', { email })
        .getOne();
    }
    return this.usuarioRepository.findOne({ where: { email } });
  }

  async update(id: number, data: UpdateUsuarioDto): Promise<Usuario> {
    if (data.senha) {
      data.senha = await bcrypt.hash(data.senha, 10);
    }

    const usuario = await this.usuarioRepository.preload({ id, ...data });
    if (!usuario) {
      throw new NotFoundException(`Usuário ${id} não encontrado.`);
    }
    return this.usuarioRepository.save(usuario);
  }

  async remove(id: number): Promise<void> {
    await this.usuarioRepository.delete(id);
  }
}
