import type { Prisma } from "@prisma/client";

import { filterBoolean, filterDate, filterString } from "../../utils/filters";

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

export { validateSO };
