import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../../database/PrismaService";
import { User } from "@prisma/client";

@Injectable()
export class FindAllUserUseCases {
    constructor(private readonly prisma: PrismaService){}

    async execute(){
        return this.prisma.user.findMany()
    }
}