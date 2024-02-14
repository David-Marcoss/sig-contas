import { PartialType } from "@nestjs/mapped-types";
import {PoupancaDto } from "./poupanca.dto";

export class UpdatePoupancaDTO extends PartialType(PoupancaDto) {}