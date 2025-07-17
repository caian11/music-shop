import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { Pedido } from './entities/pedido.entity';

@Controller('pedidos')
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) {}

  @Post()
  async create(@Body() createPedidoDto: CreatePedidoDto): Promise<Pedido> {
    return this.pedidoService.create(createPedidoDto);
  }

  @Get()
  async findAll(): Promise<Pedido[]> {
    return this.pedidoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Pedido> {
    return this.pedidoService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updatePedidoDto: UpdatePedidoDto,
  ): Promise<Pedido> {
    return this.pedidoService.update(id, updatePedidoDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.pedidoService.remove(id);
  }
}
