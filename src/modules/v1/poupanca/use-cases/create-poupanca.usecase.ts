import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../../database/PrismaService";
import { PoupancaDto } from "../dto/poupanca.dto";
import { Poupanca, User } from "@prisma/client";

@Injectable()
export class CreatePoupancaUseCases {
    constructor(private readonly prisma: PrismaService){}

    async execute(data: PoupancaDto):Promise<Poupanca>{

        if (data.userId) {
            const user = await this.prisma.user.findUnique({
                where: {
                    id: data.userId
                }
            })
            if (!user) {
                throw new Error('User not found')
            }
        }
        
        return this.prisma.poupanca.create({data})
    }
}