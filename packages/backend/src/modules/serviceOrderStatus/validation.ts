import type { Prisma } from "@prisma/client";

import { filterBoolean, filterDate } from "../../utils/filters";

const validateStatusSO = (data: unknown) => {
  if (data === null || typeof data !== "object") {
    throw new Error("Invalid data: Service Order");
  }
  const so = data as Prisma.ServiceOrderUpdateInput;

  const parsedData: Prisma.ServiceOrderUpdateInput = {
    createdAt:
      filterDate(so.createdAt) === null ? undefined : (filterDate(so.createdAt, true) as Date),
    registeredInManufacturerAt: filterDate(so.registeredInManufacturerAt),
    budgetedAt: filterDate(so.budgetedAt),
    budgetAnsweredAt: filterDate(so.budgetAnsweredAt),
    partsArrivedAt: filterDate(so.partsArrivedAt),
    repairedAt: filterDate(so.repairedAt),
    deliveredToCustomerAt: filterDate(so.deliveredToCustomerAt),
    isBudgetApproved: (() => {
      if (filterDate(so.budgetAnsweredAt) === null) {
        return null;
      } else {
        return filterBoolean(so.isBudgetApproved);
      }
    })(),
  };

  return parsedData;
};

export { validateStatusSO };
