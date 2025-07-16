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
import { Endereco } from './entities/endereco.entity';
import { Cidade } from './entities/cidade.entity';
import { Uf } from './entities/estado.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,

    @InjectRepository(Endereco)
    private enderecoRepository: Repository<Endereco>,

    @InjectRepository(Cidade)
    private cidadeRepository: Repository<Cidade>,

    @InjectRepository(Uf)
    private estadoRepository: Repository<Uf>,
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

  async findMe(id: number): Promise<Usuario> {
    const usuario = await this.usuarioRepository
      .createQueryBuilder('usuario')
      .leftJoinAndSelect('usuario.enderecos', 'endereco')
      .leftJoinAndSelect('endereco.cidade', 'cidade')
      .leftJoinAndSelect('cidade.uf', 'uf')
      .where('usuario.id = :id', { id })
      .getOne();

    if (!usuario) {
      throw new NotFoundException(`Usuário ${id} não encontrado.`);
    }

    return usuario;
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
    const usuario = await this.usuarioRepository.findOne({
      where: { id },
      relations: ['enderecos'],
    });

    if (!usuario) {
      throw new NotFoundException(`Usuário ${id} não encontrado.`);
    }

    // Atualiza senha se houver
    if (data.senha) {
      data.senha = await bcrypt.hash(data.senha, 10);
    }

    // Atualiza campos do usuário
    this.usuarioRepository.merge(usuario, data);

    const enderecosAssociados: Endereco[] = [];

    if (data.enderecos?.length) {
      for (const item of data.enderecos) {
        const cidade = await this.cidadeRepository.findOneBy({
          id: item.cidadeId,
        });

        if (!cidade) {
          throw new BadRequestException(
            `Cidade com ID ${item.cidadeId} não encontrada.`,
          );
        }

        let endereco: Endereco;

        if (item.id) {
          // Atualiza endereço existente
          const existente = await this.enderecoRepository.findOne({
            where: { id: item.id },
          });

          if (!existente) {
            throw new NotFoundException(
              `Endereço com ID ${item.id} não encontrado.`,
            );
          }

          endereco = this.enderecoRepository.merge(existente, {
            ...item,
            cidade,
          });
        } else {
          // Cria novo endereço
          endereco = this.enderecoRepository.create({
            ...item,
            cidade,
          });
        }

        const salvo = await this.enderecoRepository.save(endereco);
        enderecosAssociados.push(salvo);
      }

      usuario.enderecos = enderecosAssociados;
    }

    return this.usuarioRepository.save(usuario);
  }

  async remove(id: number): Promise<void> {
    await this.usuarioRepository.delete(id);
  }

  async salvarAccessToken(id: number, token: string): Promise<void> {
    await this.usuarioRepository.update(id, { access_token: token });
  }
}
