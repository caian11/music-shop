import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cidade } from './entities/cidade.entity';

@Injectable()
export class CidadeService {
  constructor(
    @InjectRepository(Cidade)
    private cidadeRepository: Repository<Cidade>,
  ) {}

  async findAllComEstados(): Promise<Cidade[]> {
    return this.cidadeRepository.find({
      relations: ['uf'],
      order: { nome: 'ASC' },
    });
  }
}
