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

    // Buscar os produtos a partir dos IDs fornecidos
    const produtosEncontrados = await this.produtoRepository.find({
      where: { id: In(produtos) },
    });

    if (
      !produtosEncontrados ||
      produtosEncontrados.length !== produtos.length
    ) {
      throw new NotFoundException(`Alguns produtos não foram encontrados`);
    }

    // Associar os produtos ao pedido
    pedido.produtos = produtosEncontrados;

    // Salvar o pedido com os produtos associados
    return await this.pedidoRepository.save(pedido);
  }

  // Método para atualizar um pedido
  async update(id: number, updatePedidoDto: UpdatePedidoDto): Promise<Pedido> {
    const pedido = await this.findOne(id);

    // Atualiza os dados básicos do pedido
    Object.assign(pedido, updatePedidoDto);

    // Se novos produtos foram passados, atualizamos a lista de produtos
    if (updatePedidoDto.produtos) {
      // Buscar os produtos a partir dos IDs fornecidos
      const produtosEncontrados = await this.produtoRepository.find({
        where: { id: In(updatePedidoDto.produtos) },
      });

      if (
        !produtosEncontrados ||
        produtosEncontrados.length !== updatePedidoDto.produtos.length
      ) {
        throw new NotFoundException(`Alguns produtos não foram encontrados`);
      }

      // Atualiza os produtos associados ao pedido
      pedido.produtos = produtosEncontrados;
    }

    // Salvar o pedido com os novos produtos associados
    return await this.pedidoRepository.save(pedido);
  }

  // Método para remover um pedido
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
