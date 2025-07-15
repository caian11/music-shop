import { IsString, IsOptional, IsInt } from 'class-validator';

export class EnderecoDto {
  @IsOptional()
  @IsInt()
  id?: number;

  @IsString()
  logradouro: string;

  @IsInt()
  numero: number;

  @IsOptional()
  @IsString()
  complemento?: string;

  @IsString()
  bairro: string;

  @IsString()
  cep: string;

  @IsInt()
  cidadeId: number;
}
