import type { Prisma } from "@prisma/client";

import { filterCpfOrCnpj, filterPhoneNumber, filterString, filterZip } from "../../utils/filters";
import { validateSO } from "../serviceOrder/validation";

const validateClient = (dataClient: unknown, dataSO?: unknown) => {
  if (!(typeof dataClient === "object" && dataClient !== null)) {
    throw new Error("Invalid data: Service Order");
  }
  const client = dataClient as Prisma.ClientCreateInput;

  const name = filterString(client.name);
  if (name === null) {
    throw new Error("Invalid data: Client Name");
  }

  const parsedData: Prisma.ClientCreateInput = {
    name: name,
    email: filterString(client.email),
    cpfOrCnpj: filterCpfOrCnpj(client.cpfOrCnpj),
    address: filterString(client.address),
    zip: filterZip(client.zip),
    whatsapp: filterPhoneNumber(client.whatsapp),
    tel: filterPhoneNumber(client.tel),
  };

  if (typeof dataSO === "object" && dataSO !== null) {
    parsedData.serviceOrders = {
      create: validateSO(dataSO),
    };
  }

  return parsedData;
};

export { validateClient };
