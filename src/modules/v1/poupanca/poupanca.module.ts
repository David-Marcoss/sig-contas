import { Module } from '@nestjs/common';
import { PoupancaService } from './poupanca.service';
import { PoupancaController } from './poupanca.controller';
import { PrismaService } from '../../../database/PrismaService';

@Module({
  controllers: [PoupancaController],
  providers: [PoupancaService,PrismaService],
})
export class PoupancaModule {}
