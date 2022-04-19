import type { Prisma } from "@prisma/client";

import { isCreateClient, isCreateSO, isUpdateClient, isUpdateSO } from "./checkers";
import { filterCpfOrCnpj, filterDate, filterPhoneNumber, filterString, filterZip } from "./filters";

// Service Order

export const parseCreateSO = (data: unknown) => {
  // The frontend may send the isUnderWarranty as a string, but the backend expects an boolean. This fixes that.
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  data.isUnderWarranty = data.isUnderWarranty === "on" || data.isUnderWarranty === true;

  if (!isCreateSO(data)) {
    throw new Error("Invalid data");
  }

  const equipment = filterString(data.equipment);
  if (equipment === null) {
    throw new Error("equipment name is required for creating a new equipment");
  }

  let createdAt: Date | undefined | null = filterDate(data.createdAt);
  if (createdAt === null) {
    createdAt = undefined;
  }

  const attendedBy = filterString(data.attendedBy);
  if (attendedBy === null) {
    throw new Error("Attendant name is required for creating a new equipment");
  }

  const attendedOn = filterString(data.attendedOn);
  if (attendedOn === null) {
    throw new Error("Service location is required for creating a new equipment");
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
    isUnderWarranty: data.isUnderWarranty,
    notes: filterString(data.notes),
  };

  return parsedData;
};

export const parseEditSO = (data: unknown) => {
  if (!isUpdateSO(data)) {
    throw new Error("Invalid data");
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
    isUnderWarranty: data.isUnderWarranty === "on",
    notes: filterString(data.notes),
    wasEdited: true,
  };

  return parsedData;
};

export const parseUpdateSO = (data: unknown) => {
  if (!isUpdateSO(data)) {
    throw new Error("Invalid data");
  }

  const parsedData: Prisma.ServiceOrderUpdateInput = {
    createdAt:
      filterDate(data.createdAt) === null ? (filterDate(data.createdAt) as Date) : undefined,
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
        return data.isBudgetApproved === "on";
      }
    })(),
  };

  return parsedData;
};

// Client

export const parseCreateClient = (dataClient: unknown, dataOS?: unknown) => {
  if (!isCreateClient(dataClient)) {
    throw new Error("Invalid data");
  }

  if (!isUpdateSO(dataOS)) {
    throw new Error("Invalid Service Order Data");
  }

  const name = filterString(dataClient.name);
  if (name === null) {
    throw new Error("Name is required for creating a client");
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

  if (dataOS != undefined) {
    parsedData.serviceOrders = {
      create: parseCreateSO(dataOS),
    };
  }

  return parsedData;
};

export const parseUpdateClient = (dataClient: unknown, dataOS?: unknown) => {
  if (!isUpdateClient(dataClient)) {
    throw new Error("Invalid Client Data");
  }

  if (!isUpdateSO(dataOS)) {
    throw new Error("Invalid Service Order Data");
  }

  const parsedData: Prisma.ClientUpdateInput = {
    name: filterString(dataClient.name) === null ? dataClient.name : undefined,
    email: filterString(dataClient.email),
    cpfOrCnpj: filterCpfOrCnpj(dataClient.cpfOrCnpj),
    address: filterString(dataClient.address),
    zip: filterZip(dataClient.zip),
    whatsapp: filterPhoneNumber(dataClient.whatsapp),
    tel: filterPhoneNumber(dataClient.tel),
  };

  if (dataOS != undefined) {
    parsedData.serviceOrders = {
      create: parseCreateSO(dataOS),
    };
  }

  return parsedData;
};
