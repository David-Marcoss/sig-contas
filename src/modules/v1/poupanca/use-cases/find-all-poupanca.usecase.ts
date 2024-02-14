import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../../database/PrismaService";
import { PoupancaDto } from "../dto/poupanca.dto";
import { Poupanca, User } from "@prisma/client";

@Injectable()
export class FindAllPoupancaUseCases {
    constructor(private readonly prisma: PrismaService){}

    async execute(){

        return this.prisma.poupanca.findMany()
    }
}