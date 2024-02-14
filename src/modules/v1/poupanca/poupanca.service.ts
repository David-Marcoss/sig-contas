import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/PrismaService';
import { DeletePoupancaUseCases } from './use-cases/delete-poupanca.usecase';
import { UpdatePoupancaUseCases } from './use-cases/update-poupanca.usecase';
import { FindOnePoupancaUseCases } from './use-cases/find-one-poupanca.usecase';
import { FindAllPoupancaUseCases } from './use-cases/find-all-poupanca.usecase';
import { CreatePoupancaUseCases } from './use-cases/create-poupanca.usecase';

@Injectable()
export class PoupancaService {    

    create = new CreatePoupancaUseCases(this.prisma)
    findAll = new FindAllPoupancaUseCases(this.prisma)
    findOne = new FindOnePoupancaUseCases(this.prisma)
    update = new UpdatePoupancaUseCases(this.prisma)
    delete = new DeletePoupancaUseCases(this.prisma)


    constructor(private prisma: PrismaService) { }}
