import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../../database/PrismaService";
import { Poupanca, User } from "@prisma/client";

@Injectable()
export class DeletePoupancaUseCases {
    constructor(private readonly prisma: PrismaService){}

    async execute(id):Promise<Poupanca>{

        if (id) {
            const poup = await this.prisma.poupanca.findUnique({
                where: {
                    id: id
                }
            })
            if (!poup) {
                throw new Error('Poupanca not found')
            }
        }
        
        return this.prisma.poupanca.delete({where: {id}})
    }
}