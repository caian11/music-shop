import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';

@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  async create(@Body() data: CreateUsuarioDto) {
    return this.usuarioService.create(data);
  }

  @Get()
  async findAll() {
    return this.usuarioService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usuarioService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<CreateUsuarioDto>,
  ) {
    return this.usuarioService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.usuarioService.remove(id);
  }
}
