

import { IsString, IsNotEmpty, IsNumber, IsPhoneNumber, IsOptional } from 'class-validator';

export class UserDto {
  @IsOptional()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  telefone: string;

  @IsNotEmpty()
  @IsNumber()
  salario: number;
}
