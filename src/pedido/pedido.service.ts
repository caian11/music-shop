import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Pedido } from './entities/pedido.entity';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { Produto } from '../produto/entities/produto.entity';

@Injectable()
export class PedidoService {
  constructor(
    @InjectRepository(Pedido)
    private pedidoRepository: Repository<Pedido>,
    @InjectRepository(Produto)
    private produtoRepository: Repository<Produto>,
  ) {}

  async findAll(): Promise<Pedido[]> {
    return await this.pedidoRepository.find({ relations: ['produtos'] });
  }

  async findOne(id: number): Promise<Pedido> {
    const pedido = await this.pedidoRepository.findOne({
      where: { id },
      relations: ['produtos'],
    });
    if (!pedido) {
      throw new NotFoundException(`Pedido com ID ${id} não encontrado`);
    }
    return pedido;
  }

  async create(createPedidoDto: CreatePedidoDto): Promise<Pedido> {
    const { valor, data, formaPagamento, status, numero, produtos } =
      createPedidoDto;

    const pedido = this.pedidoRepository.create({
      valor,
      data,
      formaPagamento,
      status,
      numero,
    });

    const produtosEncontrados = await this.produtoRepository.find({
      where: { id: In(produtos) },
    });

    if (
      !produtosEncontrados ||
      produtosEncontrados.length !== produtos.length
    ) {
      throw new NotFoundException(`Alguns produtos não foram encontrados`);
    }

    pedido.produtos = produtosEncontrados;

    return await this.pedidoRepository.save(pedido);
  }

  async update(id: number, updatePedidoDto: UpdatePedidoDto): Promise<Pedido> {
    const pedido = await this.findOne(id);

    Object.assign(pedido, updatePedidoDto);

    if (updatePedidoDto.produtos) {
      const produtosEncontrados = await this.produtoRepository.find({
        where: { id: In(updatePedidoDto.produtos) },
      });

      if (
        !produtosEncontrados ||
        produtosEncontrados.length !== updatePedidoDto.produtos.length
      ) {
        throw new NotFoundException(`Alguns produtos não foram encontrados`);
      }

      pedido.produtos = produtosEncontrados;
    }

    return await this.pedidoRepository.save(pedido);
  }

  async remove(id: number): Promise<void> {
    const pedido = await this.pedidoRepository.findOne({
      where: { id },
    });
    if (!pedido) {
      throw new NotFoundException(`Pedido com ID ${id} não encontrado`);
    }

    await this.pedidoRepository.delete(id);
  }
}
