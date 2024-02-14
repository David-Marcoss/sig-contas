import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../../database/PrismaService";
import { Contas, User } from "@prisma/client";
import { UpdateContaDTO } from "../dto/update-contas.dto";

@Injectable()
export class UpdateContasUseCases {
    constructor(private readonly prisma: PrismaService){}

    async execute(id, data:UpdateContaDTO):Promise<Contas>{

        if (id) {
            const conta = await this.prisma.contas.findUnique({
                where: {
                    id: id
                }
            })
            if (!conta) {
                throw new Error('Conta not found')
            }
        }
        
        return this.prisma.contas.update({where: {id}, data})
    }
}