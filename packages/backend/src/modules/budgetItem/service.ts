import { Prisma } from "@prisma/client";

import prisma from "../../database/prisma";

class BudgetItemService {
  async create(budgetId: number, item: Prisma.BudgetItemCreateManyBudgetInput) {
    return await prisma.budget.update({
      where: { id: budgetId },
      data: {
        itens: {
          create: item,
        },
      },
      include: {
        itens: true,
      },
    });
  }

  async update(id: number, item: Prisma.BudgetItemUpdateInput) {
    return await prisma.budgetItem.update({
      where: { id },
      data: item,
    });
  }

  async deleteOne(id: number) {
    await prisma.budgetItem.delete({
      where: { id },
    });
  }
}

const budgetItemService = new BudgetItemService();

export default budgetItemService;
