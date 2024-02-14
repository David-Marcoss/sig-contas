import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/PrismaService';
import { CreateUserUseCases } from './use-cases/create-user.usecase';
import { FindAllUserUseCases } from './use-cases/find-all-user.usecase';
import { FindOneUserUseCases } from './use-cases/find-one-user.usecase';
import { UpdateUserUseCases } from './use-cases/update-user.usecase copy';
import { DeleteUserUseCases } from './use-cases/delete-user.usecase';

@Injectable()
export class UserService {

    create = new CreateUserUseCases(this.prisma)
    findAll = new FindAllUserUseCases(this.prisma)
    findOne = new FindOneUserUseCases(this.prisma)
    update = new UpdateUserUseCases(this.prisma)
    delete = new DeleteUserUseCases(this.prisma)


    constructor(private prisma: PrismaService) { }
}
