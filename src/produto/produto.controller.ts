import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { Produto } from './entities/produto.entity';
import { ProdutoDto } from './dto/create-produto.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('produto')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(): Promise<Produto[]> {
    return this.produtoService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: number): Promise<Produto> {
    return this.produtoService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() produtoDto: ProdutoDto): Promise<Produto> {
    return this.produtoService.create(produtoDto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: number,
    @Body() produtoDto: ProdutoDto,
  ): Promise<Produto> {
    return this.produtoService.update(id, produtoDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: number): Promise<void> {
    await this.produtoService.remove(id);
  }
}
