import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../../database/PrismaService";
import { Poupanca, User } from "@prisma/client";
import { UpdatePoupancaDTO } from "../dto/update-poupanca.dto";

@Injectable()
export class UpdatePoupancaUseCases {
    constructor(private readonly prisma: PrismaService){}

    async execute(id, data:UpdatePoupancaDTO):Promise<Poupanca>{

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
        
        return this.prisma.poupanca.update({where: {id}, data})
    }
}