import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/v1/user/user.module';
import { ContasModule } from './modules/v1/contas/contas.module';
import { PoupancaModule } from './modules/v1/poupanca/poupanca.module';

@Module({
  imports: [UserModule, ContasModule, PoupancaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
