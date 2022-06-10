import type { Prisma } from "@prisma/client";

import { filterString } from "@/utils/filters";

const validateBudget = (data: unknown) => {
  if (!(typeof data === "object" && data !== null)) {
    throw new Error("Invalid data: Budget");
  }
  const budget = data as Prisma.BudgetCreateManyServiceOrderInput;

  const name = filterString(budget.name);
  if (name === null) {
    throw new Error("Invalid data: Budget name");
  }

  const parsedData: Prisma.BudgetCreateManyServiceOrderInput = {
    name,
  };

  return parsedData;
};

export { validateBudget };
