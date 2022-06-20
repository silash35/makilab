/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Prisma } from "@prisma/client";
import type { Request } from "express";

import { filterBoolean, filterDate, filterString } from "@/utils/filters";

const validateQuery = (query: Request["query"]): Prisma.ServiceOrderFindManyArgs => {
  const showFinalized = query.showFinalized === "true";

  return {
    where: showFinalized
      ? undefined
      : {
          deliveredToCustomerAt: null,
        },
  };
};

const validateSO = (data: unknown) => {
  if (!(typeof data === "object" && data !== null)) {
    throw new Error("Invalid data: Service Order");
  }
  const so = data as Prisma.ServiceOrderCreateManyOwnerInput;

  const equipment = filterString(so.equipment);
  if (equipment === null) {
    throw new Error("Invalid data: Equipment name");
  }

  let createdAt: Date | undefined | null = filterDate(so.createdAt, true);
  if (createdAt === null) {
    createdAt = undefined;
  }

  const voltage = filterString(so.voltage);
  if (voltage === null) {
    throw new Error("Invalid data: Voltage");
  }

  const attendedBy = filterString(so.attendedBy);
  if (attendedBy === null) {
    throw new Error("Invalid data: Attendant name");
  }

  const attendedOn = filterString(so.attendedOn);
  if (attendedOn === null) {
    throw new Error("Invalid data: Service location");
  }

  const parsedData: Prisma.ServiceOrderCreateManyOwnerInput = {
    equipment: equipment,
    brand: filterString(so.brand),
    model: filterString(so.model),
    productNumber: filterString(so.productNumber),
    batchOrImei: filterString(so.batchOrImei),
    accessories: filterString(so.accessories),
    productCondition: filterString(so.productCondition),
    createdAt: createdAt,
    voltage: voltage,
    attendedBy: attendedBy,
    attendedOn: attendedOn,
    isUnderWarranty: filterBoolean(so.isUnderWarranty),
    notes: filterString(so.notes),
  };

  return parsedData;
};

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

export { validateQuery, validateSO, validateStatusSO };
