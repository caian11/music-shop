import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Produto } from './entities/produto.entity';
import { ProdutoDto } from './dto/create-produto.dto';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(Produto)
    private produtoRepository: Repository<Produto>,
  ) {}

  async findAll(): Promise<Produto[]> {
    return await this.produtoRepository.find();
  }

  async findOne(id: number): Promise<Produto> {
    const produto = await this.produtoRepository.findOne({
      where: { id },
    });
    if (!produto) {
      throw new NotFoundException(`Produto com ID ${id} não encontrado`);
    }
    return produto;
  }

  async create(produtoDto: ProdutoDto): Promise<Produto> {
    const produto = this.produtoRepository.create(produtoDto);
    return await this.produtoRepository.save(produto);
  }

  async update(id: number, produtoDto: ProdutoDto): Promise<Produto> {
    const produto = await this.findOne(id);

    Object.assign(produto, produtoDto);

    return await this.produtoRepository.save(produto);
  }

  async remove(id: number): Promise<void> {
    const produto = await this.produtoRepository.findOne({
      where: { id },
    });
    if (!produto) {
      throw new NotFoundException(`Produto com ID ${id} não encontrado`);
    }

    await this.produtoRepository.delete(id);
  }
}
