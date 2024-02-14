import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../../database/PrismaService";
import { Contas, User } from "@prisma/client";

@Injectable()
export class DeleteContasUseCases {
    constructor(private readonly prisma: PrismaService){}

    async execute(id):Promise<Contas>{

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
        
        return this.prisma.contas.delete({where: {id}})
    }
}