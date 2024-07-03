import { Injectable } from "@nestjs/common";
import { CreateSpotDto } from "./dto/create-spot.dto";
import { PrismaService } from "../prisma/prisma.service";
import { SpotStatus } from "@prisma/client";
import { UpdateSpotDTO } from "./dto/update.dto";

@Injectable()
export class SpotsService {
  constructor(private prismaService: PrismaService) {}

  async create(createSpotDto: CreateSpotDto & { eventId: string }) {
    const event = await this.prismaService.event.findFirst({
      where: { id: createSpotDto.eventId },
    });
    if (!event) {
      throw new Error("Event not found");
    }
    return this.prismaService.spot.create({
      data: { ...createSpotDto, status: SpotStatus.available },
    });
  }

  findAll(eventId: string) {
    return this.prismaService.spot.findMany({
      where: {
        eventId: eventId,
      },
    });
  }

  findOne(eventId: string, id: string) {
    return this.prismaService.spot.findMany({
      where: {
        id,
        eventId: eventId,
      },
    });
  }

  update(eventId: string, id: string, updateSpotDto: UpdateSpotDTO) {
    console.log(updateSpotDto);
    return `This action updates a #${id} spot`;
  }

  remove(eventId: string, id: string) {
    return `This action removes a #${id} spot`;
  }
}
