import { Injectable } from "@nestjs/common";
import { CreateSpotRequest } from "./request/create-spot.request";
import { UpdateSpotRequest } from "./request/update-spot.request";
import { SpotStatus } from "@prisma/client";
import { PrismaService } from "@app/core/prisma/prisma.service";

@Injectable()
export class SpotsService {
  constructor(private prismaService: PrismaService) {}

  async create(createSpotDto: CreateSpotRequest & { eventId: string }) {
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

  update(eventId: string, id: string, updateSpotRequest: UpdateSpotRequest) {
    return this.prismaService.spot.update({
      where: {
        eventId: eventId,
        id: id,
      },
      data: {
        ...updateSpotRequest,
        updatedAt: new Date(),
      },
    });
  }

  remove(eventId: string, id: string) {
    return `This action removes a #${id} spot`;
  }
}
