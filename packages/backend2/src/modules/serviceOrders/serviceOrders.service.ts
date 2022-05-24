import { Injectable } from "@nestjs/common";

import { PrismaService } from "@/database/prismaService";

@Injectable()
export class ServiceOrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    const allSOs = await this.prisma.serviceOrder.findMany({
      include: {
        owner: true,
      },
    });

    return allSOs;
  }
}
