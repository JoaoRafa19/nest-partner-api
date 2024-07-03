import { PartialType } from "@nestjs/mapped-types";
import { CreateSpotDto } from "./create-spot.dto";

export class UpdateSpotDTO extends PartialType(CreateSpotDto) {}
