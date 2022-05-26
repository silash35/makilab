import { Prisma } from "@prisma/client";

import prisma from "../../database/prisma";

class ServiceOrderService {
  // Read functions
  async getAll() {
    return await prisma.serviceOrder.findMany({
      include: {
        owner: true,
      },
    });
  }

  async getOne(id: number) {
    return await prisma.serviceOrder.findUnique({
      where: { id },
      include: {
        owner: true,
      },
    });
  }

  // Write functions
  async update(id: number, serviceOrder: Prisma.ServiceOrderUpdateInput) {
    return await prisma.serviceOrder.update({
      where: { id },
      data: serviceOrder,
    });
  }

  async deleteOne(id: number) {
    await prisma.serviceOrder.delete({
      where: { id },
    });
  }
}

const serviceOrderService = new ServiceOrderService();

export default serviceOrderService;
