import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { ReserveSpotDto } from './dto/reserve-spot.dto';
import { Prisma, SpotStatus, TicketStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EventsService {
	constructor(private prismaService: PrismaService) {}

	create(createEventDto: CreateEventDto) {
		return this.prismaService.event.create({
			data: {
				...createEventDto,
				date: new Date(createEventDto.date),
			},
		});
	}

	findAll() {
		return this.prismaService.event.findMany();
	}

	findOne(id: string) {
		return this.prismaService.event.findUnique({
			where: {
				id: id,
			},
		});
	}

	update(id: string, updateEventDto: UpdateEventDto) {
		return this.prismaService.event.update({
			where: {
				id: id,
			},
			data: { ...updateEventDto, updatedAt: new Date() },
		});
	}

	remove(id: string) {
		return this.prismaService.event.delete({
			where: {
				id: id,
			},
		});
	}

	async reserveSopt(dto: ReserveSpotDto & { eventId: string }) {
		try {
			const spots = await this.prismaService.spot.findMany({
				where: {
					eventId: dto.eventId,
					name: {
						in: dto.spots,
					},
				},
			});
			if (spots.length != dto.spots.length) {
				const foundSpots = spots.map((spot) => spot.name);
				const notFoundSpotsName = dto.spots.filter(
					(spotName) => !foundSpots.includes(spotName),
				);
				throw new Error(
					`Spots ${notFoundSpotsName.join(', ')} not found`,
				);
			}
			const tickets = await this.prismaService.$transaction(
				async (prisma) => {
					await prisma.reservationHisory.createMany({
						data: spots.map((spot) => ({
							spotId: spot.id,
							ticketKind: dto.ticket_kind,
							email: dto.email,
							status: TicketStatus.reserved,
						})),
					});

					prisma.spot.updateMany({
						where: {
							id: {
								in: spots.map((spot) => spot.id),
							},
						},
						data: {
							status: SpotStatus.reserverd,
						},
					});

					const tickets = await Promise.all(
						spots.map((spot) =>
							prisma.ticket.create({
								data: {
									email: dto.email,
									ticketKind: dto.ticket_kind,
									spotId: spot.id,
								},
							}),
						),
					);
					return tickets;
				},
				{
					isolationLevel:
						Prisma.TransactionIsolationLevel.ReadCommitted,
				},
			);

			return tickets;
		} catch (e) {
			if (e instanceof Prisma.PrismaClientKnownRequestError) {
				switch (e.code) {
					case 'P2002':
					case 'P2034':
						throw new Error('Some spots are already reserved');
				}
			}
			throw e;
		}
	}
}
