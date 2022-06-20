import { Prisma } from "@prisma/client";

import prisma from "@/database/prisma";

class ClientService {
  // Read functions
  async getAll(query: Prisma.ClientFindManyArgs) {
    return await prisma.client.findMany(query);
  }

  // Write functions
  async create(client: Prisma.ClientCreateInput) {
    return await prisma.client.create({
      data: client,
      include: {
        serviceOrders: true,
      },
    });
  }

  async update(id: number, client: Prisma.ClientUpdateInput) {
    return await prisma.client.update({
      where: { id },
      data: client,
      include: {
        serviceOrders: true,
      },
    });
  }

  async deleteOne(id: number) {
    await prisma.serviceOrder.deleteMany({
      where: {
        ownerId: id,
      },
    });
    await prisma.client.delete({
      where: { id },
    });
  }
}

const clientService = new ClientService();

export default clientService;
