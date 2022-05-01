import { Prisma } from "@prisma/client";

import prisma from "../database/prisma";
import { processClient } from "../utils/processors";

// Read functions
export const getAll = async () => {
  const allClients = await prisma.client.findMany({
    include: {
      serviceOrders: true,
    },
  });

  return processClient(allClients);
};

// Write functions
export const create = async (client: Prisma.ClientCreateInput) => {
  const createdClient = await prisma.client.create({
    data: client,
    include: {
      serviceOrders: true,
    },
  });

  return processClient(createdClient);
};

export const update = async (id: number, client: Prisma.ClientUpdateInput) => {
  const editedClient = await prisma.client.update({
    where: { id },
    data: client,
    include: {
      serviceOrders: true,
    },
  });
  return processClient(editedClient);
};

export const deleteOne = async (id: number) => {
  await prisma.serviceOrder.deleteMany({
    where: {
      ownerId: id,
    },
  });
  await prisma.client.delete({
    where: { id },
  });
};
