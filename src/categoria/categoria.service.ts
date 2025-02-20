import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { Categoria } from './entities/categoria.entity';

@Injectable()
export class CategoriaService {
  constructor(
    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,
  ) {}

  async create(data: CreateCategoriaDto): Promise<Categoria> {
    const Categoria = this.categoriaRepository.create(data);

    return await this.categoriaRepository.save(Categoria);
  }

  async findAll(): Promise<Categoria[]> {
    return await this.categoriaRepository.find();
  }

  async findOne(id: number): Promise<Categoria> {
    const categoria = await this.categoriaRepository.findOneBy({ id });
    if (!categoria) {
      throw new NotFoundException(`Categoria não encontrada!`);
    }
    return categoria;
  }

  async update(id: number, data: UpdateCategoriaDto): Promise<Categoria> {
    const categoria = await this.findOne(id);

    const categoriaAtualizada = Object.assign(categoria, data);
    return this.categoriaRepository.save(categoriaAtualizada);
  }

  async remove(id: number): Promise<{ message: string }> {
    await this.findOne(id);
    await this.categoriaRepository.delete(id);
    return { message: 'Categoria deletada com sucesso!' };
  }
}
