import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../../database/PrismaService";
import { UserDto } from "../dto/create-user.dto";
import { User } from "@prisma/client";

@Injectable()
export class CreateUserUseCases {
    constructor(private readonly prisma: PrismaService){}

    async execute(data: UserDto):Promise<User>{
        return this.prisma.user.create({data})
    }
}