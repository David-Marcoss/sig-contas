import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/PrismaService';
import { CreateContaUseCases } from './use-cases/create-conta.usecase';
import { FindAllContasUseCases } from './use-cases/find-all-conta.usecase';
import { FindOneContasUseCases } from './use-cases/find-one-conta.usecase';
import { UpdateContasUseCases } from './use-cases/update-conta.usecas';
import { DeleteContasUseCases } from './use-cases/delete-conta.usecase';

@Injectable()
export class ContasService {

    create = new CreateContaUseCases(this.prisma)
    findAll = new FindAllContasUseCases(this.prisma)
    findOne = new FindOneContasUseCases(this.prisma)
    update = new UpdateContasUseCases(this.prisma)
    delete = new DeleteContasUseCases(this.prisma)


    constructor(private prisma: PrismaService) { }
}
