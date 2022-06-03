import type { Prisma } from "@prisma/client";

import prisma from "@/database/prisma";

class BudgetService {
  // Read functions
  async getAll(serviceOrderId: number) {
    return await prisma.budget.findMany({
      where: { serviceOrder: { id: serviceOrderId } },
      include: {
        itens: true,
      },
    });
  }

  async getOne(id: number) {
    return await prisma.budget.findUnique({
      where: { id },
      include: {
        itens: true,
      },
    });
  }

  async create(serviceOrderId: number, budget: Prisma.BudgetCreateManyServiceOrderInput) {
    return (
      await prisma.serviceOrder.update({
        where: { id: serviceOrderId },
        data: {
          budget: {
            create: budget,
          },
        },
        include: {
          budget: {
            include: {
              itens: true,
            },
          },
        },
      })
    ).budget;
  }

  // Write functions
  async deleteOne(id: number) {
    await prisma.budget.delete({
      where: { id },
    });
  }
}

const budgetService = new BudgetService();

export default budgetService;
