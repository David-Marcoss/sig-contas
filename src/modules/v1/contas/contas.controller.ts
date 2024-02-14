import { ContasService } from './contas.service';
import { Body, Controller, Delete, Get, Param, Post, Put, ValidationPipe } from '@nestjs/common';
import { ContasDTO } from './dto/contas.dto';
import { UpdateContaDTO } from './dto/update-contas.dto';


@Controller('api/v1/contas')
export class ContasController {
  constructor(private readonly contasService: ContasService) {}

  @Post()
  async create(@Body(new ValidationPipe()) data: ContasDTO) {
    return this.contasService.create.execute(data);
  }

  @Get()
  async findAll() {
    return this.contasService.findAll.execute();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.contasService.findOne.execute(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body(new ValidationPipe()) data: UpdateContaDTO) {
    return this.contasService.update.execute(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.contasService.delete.execute(id);
  }


}
