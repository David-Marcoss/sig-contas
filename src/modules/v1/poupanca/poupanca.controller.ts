import { Body, Controller, Delete, Get, Param, Post, Put, ValidationPipe } from '@nestjs/common';
import { PoupancaService } from './poupanca.service';
import { PoupancaDto } from './dto/poupanca.dto';
import { UpdatePoupancaDTO } from './dto/update-poupanca.dto';

@Controller('api/v1/poupanca')
export class PoupancaController {
  constructor(private readonly poupancaService: PoupancaService) {}
  
  @Post()
  async create(@Body(new ValidationPipe()) data: PoupancaDto) {
    return this.poupancaService.create.execute(data);
  }

  @Get()
  async findAll() {
    return this.poupancaService.findAll.execute();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.poupancaService.findOne.execute(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body(new ValidationPipe()) data: UpdatePoupancaDTO) {
    return this.poupancaService.update.execute(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.poupancaService.delete.execute(id);
  }

}
