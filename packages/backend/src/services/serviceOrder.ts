import { Prisma } from "@prisma/client";

import prisma from "../database/prisma";
import { processPublicSO, processSO } from "../utils/processors";

// Read functions
export const getAll = async () => {
  const allSOs = await prisma.serviceOrder.findMany({
    include: {
      owner: true,
    },
  });
  return processSO(allSOs);
};

export const getOne = async (id: number) => {
  const serviceOrder = await prisma.serviceOrder.findUnique({
    where: { id },
    include: {
      owner: true,
    },
  });

  return processSO(serviceOrder);
};

export const getOnePublic = async (id: number) => {
  const serviceOrder = await prisma.serviceOrder.findUnique({
    where: { id },
    include: {
      owner: true,
    },
  });

  return processPublicSO(serviceOrder);
};

// Write functions
export const update = async (id: number, serviceOrder: Prisma.ServiceOrderUpdateInput) => {
  const editedServiceOrder = await prisma.serviceOrder.update({
    where: { id },
    data: serviceOrder,
  });

  return processSO(editedServiceOrder);
};

export const deleteOne = async (id: number) => {
  await prisma.serviceOrder.delete({
    where: { id },
  });
};
