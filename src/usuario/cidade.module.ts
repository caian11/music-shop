import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CidadeService } from './cidade.service';
import { CidadeController } from './cidade.controller';
import { Cidade } from './entities/cidade.entity';
import { Uf } from './entities/estado.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cidade, Uf])],
  providers: [CidadeService],
  controllers: [CidadeController],
})
export class CidadeModule {}
