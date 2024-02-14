// poupanca.dto.ts

import { IsString, IsNotEmpty, IsOptional, IsNumber, IsDate } from 'class-validator';

export class PoupancaDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsNotEmpty()
  @IsString()
  descricao: string;

  @IsNotEmpty()
  @IsNumber()
  saldo: number;

  @IsNotEmpty()
  @IsNumber()
  objetivo: number;

  @IsOptional()
  @IsString()
  userId?: string;

  @IsOptional()
  @IsDate()
  created_at?: Date;

  @IsOptional()
  @IsDate()
  updated_at?: Date;
}
