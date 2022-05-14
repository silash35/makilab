import type { Prisma } from "@prisma/client";

import { isCreateClient, isCreateSO, isUpdateClient, isUpdateSO } from "./checkers";
import {
  filterBoolean,
  filterCpfOrCnpj,
  filterDate,
  filterPhoneNumber,
  filterString,
  filterZip,
} from "./filters";

// Service Order

export const parseCreateSO = (data: unknown) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore

  if (!isCreateSO(data)) {
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

export const parseUpdateSO = (data: unknown) => {
  if (!isUpdateSO(data)) {
    throw new Error("Invalid data: Service Order");
  }

  const parsedData: Prisma.ServiceOrderUpdateInput = {
    equipment: filterString(data.equipment) === null ? data.equipment : undefined,
    brand: filterString(data.brand),
    model: filterString(data.model),
    productNumber: filterString(data.productNumber),
    batchOrImei: filterString(data.batchOrImei),
    accessories: filterString(data.accessories),
    productCondition: filterString(data.productCondition),
    listOfServices: filterString(data.listOfServices),
    attendedBy: filterString(data.attendedBy) === null ? data.attendedBy : undefined,
    attendedOn: filterString(data.attendedOn) === null ? data.attendedOn : undefined,
    isUnderWarranty: filterBoolean(data.isUnderWarranty),
    notes: filterString(data.notes),
    wasEdited: true,
  };

  return parsedData;
};

export const parseUpdateStatusSO = (data: unknown) => {
  if (!isUpdateSO(data)) {
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

export const parseCreateClient = (dataClient: unknown, dataSO?: unknown) => {
  if (!isCreateClient(dataClient)) {
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

  if (isCreateSO(dataSO)) {
    parsedData.serviceOrders = {
      create: parseCreateSO(dataSO),
    };
  }

  return parsedData;
};

export const parseUpdateClient = (dataClient: unknown, dataSO?: unknown) => {
  if (!isUpdateClient(dataClient)) {
    throw new Error("Invalid data: Client");
  }

  const parsedData: Prisma.ClientUpdateInput = {
    name: filterString(dataClient.name) === null ? undefined : dataClient.name,
    email: filterString(dataClient.email),
    cpfOrCnpj: filterCpfOrCnpj(dataClient.cpfOrCnpj),
    address: filterString(dataClient.address),
    zip: filterZip(dataClient.zip),
    whatsapp: filterPhoneNumber(dataClient.whatsapp),
    tel: filterPhoneNumber(dataClient.tel),
  };

  if (isCreateSO(dataSO)) {
    parsedData.serviceOrders = {
      create: parseCreateSO(dataSO),
    };
  }

  return parsedData;
};
