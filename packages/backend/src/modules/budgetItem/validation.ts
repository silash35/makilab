import type { Prisma } from "@prisma/client";

import { filterMoney, filterNumber, filterString } from "@/utils/filters";

const validateItem = (data: unknown) => {
  if (!(typeof data === "object" && data !== null)) {
    throw new Error("Invalid data: Budget Item");
  }
  const item = data as Prisma.BudgetItemCreateManyBudgetInput;

  const name = filterString(item.name);
  if (name === null) {
    throw new Error("Invalid data: Budget Item name");
  }

  const price = filterMoney(item.price);
  if (price === null) {
    throw new Error("Invalid data: Budget Item price");
  }

  const quantity = filterNumber(item.quantity);
  if (quantity === null) {
    throw new Error("Invalid data: Budget Item quantity");
  }

  const parsedData: Prisma.BudgetItemCreateManyBudgetInput = {
    name,
    price,
    quantity,
  };

  return parsedData;
};

export { validateItem };
