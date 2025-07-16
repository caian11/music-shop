import {
  IsString,
  IsNotEmpty,
  IsDecimal,
  IsDateString,
  IsArray,
  ArrayNotEmpty,
  IsInt,
} from 'class-validator';

export class CreatePedidoDto {
  @IsNotEmpty()
  valor: number;

  @IsDateString()
  @IsNotEmpty()
  data: string;

  @IsString()
  @IsNotEmpty()
  formaPagamento: string;

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsString()
  @IsNotEmpty()
  numero: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  produtos: number[]; // Array de IDs de produtos que serão associados ao pedido
}
