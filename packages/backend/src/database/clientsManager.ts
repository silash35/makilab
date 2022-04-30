import { Prisma } from "@prisma/client";

import { processClient } from "@/utils/backend/processors";

import prisma from "./prisma";

class ClientsManager {
  // Read functions
  async readAll() {
    const allClients = await prisma.client.findMany({
      include: {
        serviceOrders: true,
      },
    });

    return processClient(allClients);
  }

  // Write functions

  async create(client: Prisma.ClientCreateInput) {
    const createdClient = await prisma.client.create({
      data: client,
      include: {
        serviceOrders: true,
      },
    });

    return processClient(createdClient);
  }

  async update(id: number, client: Prisma.ClientUpdateInput) {
    const editedClient = await prisma.client.update({
      where: { id },
      data: client,
      include: {
        serviceOrders: true,
      },
    });
    return processClient(editedClient);
  }

  async delete(id: number) {
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

const clientsManager = new ClientsManager();
export default clientsManager;
