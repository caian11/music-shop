import {
  IsString,
  IsOptional,
  IsDecimal,
  IsInt,
  IsBoolean,
  Min,
} from 'class-validator';

export class ProdutoDto {
  @IsString()
  nome: string;

  @IsOptional()
  @IsString()
  marca?: string;

  @Min(0)
  valor: number;

  @IsInt()
  @Min(0)
  quantidadeEstoque: number;

  @IsOptional()
  @IsString()
  descricao?: string;

  @IsBoolean()
  status: boolean;
}
