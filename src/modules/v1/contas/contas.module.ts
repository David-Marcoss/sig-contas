import { Module } from '@nestjs/common';
import { ContasService } from './contas.service';
import { ContasController } from './contas.controller';
import { PrismaService } from '../../../database/PrismaService';

@Module({
  controllers: [ContasController],
  providers: [ContasService,PrismaService],
})
export class ContasModule {}
