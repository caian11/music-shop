import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';

export class CreateCategoriaDto {
  @IsString({ message: 'O nome deve ser uma string.' })
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  nome: string;

  @IsBoolean({ message: 'O campo ativo deve ser um valor booleano.' })
  @IsNotEmpty({ message: 'O campo ativo é obrigatório.' })
  ativo: boolean;
}
