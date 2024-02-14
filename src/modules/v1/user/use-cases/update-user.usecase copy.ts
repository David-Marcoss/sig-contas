import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../../database/PrismaService";
import { User } from "@prisma/client";
import { UpdateUserDTO } from "../dto/update-user.dto";

@Injectable()
export class UpdateUserUseCases {
    constructor(private readonly prisma: PrismaService){}

    async execute(id: string,data: UpdateUserDTO):Promise<User>{

        const userExists = await this.prisma.user.findUnique({
            where: {
                id
            }
        })

        if(!userExists){
            throw new Error('User not found')
        }

        return this.prisma.user.update({
            data,
            where:{id},
        })
    }
}