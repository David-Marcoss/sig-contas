import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../../database/PrismaService";
import { User } from "@prisma/client";

@Injectable()
export class FindOneUserUseCases {
    constructor(private readonly prisma: PrismaService){}

    async execute(id: string):Promise<User>{

        const userExists = await this.prisma.user.findUnique({
            where: {
                id
            }
        })

        if(!userExists){
            throw new Error('User not found')
        }

        return this.prisma.user.findFirst({
            where: {
                id
            }
        })
    }
}