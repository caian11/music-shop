import { Expose, Type } from 'class-transformer';

export class UfDto {
  @Expose()
  id: number;

  @Expose()
  nome: string;

  @Expose()
  sigla: string;
}

export class CidadeDto {
  @Expose()
  id: number;

  @Expose()
  nome: string;

  @Expose()
  @Type(() => UfDto)
  uf: UfDto;
}
