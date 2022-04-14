import { Prisma } from "@prisma/client";

import prisma from "./prisma";

class ServiceOrdersManager {
  // Read functions
  async readAll() {
    const allSOs = await prisma.serviceOrder.findMany({
      include: {
        owner: true,
      },
    });
    return allSOs;
  }

  async readOne(id: number) {
    const serviceOrder = await prisma.serviceOrder.findUnique({
      where: { id },
      include: {
        owner: true,
      },
    });

    return serviceOrder;
  }

  // Write functions
  async update(id: number, serviceOrder: Prisma.ServiceOrderUpdateInput) {
    const editedServiceOrder = await prisma.serviceOrder.update({
      where: { id },
      data: serviceOrder,
    });

    return editedServiceOrder;
  }

  async delete(id: number) {
    await prisma.serviceOrder.delete({
      where: { id },
    });
  }
}

const serviceOrdersManager = new ServiceOrdersManager();
export default serviceOrdersManager;
