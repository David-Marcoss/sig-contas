import { PartialType } from "@nestjs/mapped-types";
import {ContasDTO } from "./contas.dto";

export class UpdateContaDTO extends PartialType(ContasDTO) {}