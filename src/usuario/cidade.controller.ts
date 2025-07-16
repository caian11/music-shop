import { plainToInstance } from 'class-transformer';
import { CidadeDto } from './dto/cidade.dto';
import { Controller, Get } from '@nestjs/common';
import { CidadeService } from './cidade.service';

@Controller('cidades')
export class CidadeController {
  constructor(private readonly cidadeService: CidadeService) {}

  @Get()
  async findAll(): Promise<CidadeDto[]> {
    const cidades = await this.cidadeService.findAllComEstados();

    return plainToInstance(CidadeDto, cidades, {
      excludeExtraneousValues: true,
    });
  }
}
