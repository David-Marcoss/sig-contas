import { Body, Controller, Delete, Get, Param, Post, Put, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';

@Controller('api/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body(new ValidationPipe()) data: UserDto) {
    return this.userService.create.execute(data);
  }

  @Get()
  async findAll() {
    return this.userService.findAll.execute();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.userService.findOne.execute(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body(new ValidationPipe()) data: UpdateUserDTO) {
    return this.userService.update.execute(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.userService.delete.execute(id);
  }

}
