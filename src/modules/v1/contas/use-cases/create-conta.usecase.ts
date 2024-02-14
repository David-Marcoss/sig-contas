import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../../database/PrismaService";
import { ContasDTO } from "../dto/contas.dto";
import { Contas, User } from "@prisma/client";

@Injectable()
export class CreateContaUseCases {
    constructor(private readonly prisma: PrismaService){}

    async execute(data: ContasDTO):Promise<Contas>{

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
        
        return this.prisma.contas.create({data})
    }
}