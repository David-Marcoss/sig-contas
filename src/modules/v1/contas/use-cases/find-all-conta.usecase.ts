import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../../database/PrismaService";
import { ContasDTO } from "../dto/contas.dto";
import { Contas} from "@prisma/client";

@Injectable()
export class FindAllContasUseCases {
    constructor(private readonly prisma: PrismaService){}

    async execute(){
        return this.prisma.contas.findMany()
    }
}