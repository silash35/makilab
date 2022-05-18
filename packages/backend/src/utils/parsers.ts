import type { Prisma } from "@prisma/client";

import { isClient, isSO } from "./checkers";
import {
  filterBoolean,
  filterCpfOrCnpj,
  filterDate,
  filterPhoneNumber,
  filterString,
  filterZip,
} from "./filters";

// Service Order

export const parseSO = (data: unknown) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore

  if (!isSO(data)) {
    throw new Error("Invalid data: Service Order");
  }

  const equipment = filterString(data.equipment);
  if (equipment === null) {
    throw new Error("Invalid data: Equipment name");
  }

  let createdAt: Date | undefined | null = filterDate(data.createdAt, true);
  if (createdAt === null) {
    createdAt = undefined;
  }

  const attendedBy = filterString(data.attendedBy);
  if (attendedBy === null) {
    throw new Error("Invalid data: Attendant name");
  }

  const attendedOn = filterString(data.attendedOn);
  if (attendedOn === null) {
    throw new Error("Invalid data: Service location");
  }

  const parsedData: Prisma.ServiceOrderCreateManyOwnerInput = {
    equipment: equipment,
    brand: filterString(data.brand),
    model: filterString(data.model),
    productNumber: filterString(data.productNumber),
    batchOrImei: filterString(data.batchOrImei),
    accessories: filterString(data.accessories),
    productCondition: filterString(data.productCondition),
    createdAt: createdAt,
    attendedBy: attendedBy,
    attendedOn: attendedOn,
    isUnderWarranty: filterBoolean(data.isUnderWarranty),
    notes: filterString(data.notes),
  };

  return parsedData;
};

export const parseStatusSO = (data: unknown) => {
  if (!isSO(data)) {
    throw new Error("Invalid data: Service Order Status");
  }

  const parsedData: Prisma.ServiceOrderUpdateInput = {
    createdAt:
      filterDate(data.createdAt) === null ? undefined : (filterDate(data.createdAt, true) as Date),
    registeredInManufacturerAt: filterDate(data.registeredInManufacturerAt),
    budgetedAt: filterDate(data.budgetedAt),
    budgetAnsweredAt: filterDate(data.budgetAnsweredAt),
    partsArrivedAt: filterDate(data.partsArrivedAt),
    repairedAt: filterDate(data.repairedAt),
    deliveredToCustomerAt: filterDate(data.deliveredToCustomerAt),
    isBudgetApproved: (() => {
      if (filterDate(data.budgetAnsweredAt) === null) {
        return null;
      } else {
        return filterBoolean(data.isBudgetApproved);
      }
    })(),
  };

  return parsedData;
};

// Client

export const parseClient = (dataClient: unknown, dataSO?: unknown) => {
  if (!isClient(dataClient)) {
    throw new Error("Invalid data: Client");
  }

  const name = filterString(dataClient.name);
  if (name === null) {
    throw new Error("Invalid data: Client Name");
  }

  const parsedData: Prisma.ClientCreateInput = {
    name: name,
    email: filterString(dataClient.email),
    cpfOrCnpj: filterCpfOrCnpj(dataClient.cpfOrCnpj),
    address: filterString(dataClient.address),
    zip: filterZip(dataClient.zip),
    whatsapp: filterPhoneNumber(dataClient.whatsapp),
    tel: filterPhoneNumber(dataClient.tel),
  };

  if (isSO(dataSO)) {
    parsedData.serviceOrders = {
      create: parseSO(dataSO),
    };
  }

  return parsedData;
};
