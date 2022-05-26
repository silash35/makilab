import { Prisma } from "@prisma/client";

import prisma from "../../database/prisma";
import processClient from "./processor";

class ClientService {
  // Read functions
  async getAll() {
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
