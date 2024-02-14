import { IsNotEmpty, IsString, IsNumber, IsOptional, IsDate } from 'class-validator';

export class ContasDTO {
 
  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsNotEmpty()
  @IsString()
  categoria: string;

  @IsNotEmpty()
  @IsNumber()
  valor: number;

  @IsOptional()
  @IsString()
  userId: string | null;

}
