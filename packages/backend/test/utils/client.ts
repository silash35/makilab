import { Prisma } from "@prisma/client";

import prisma from "@/database/prisma";

import { generateClient, generateServiceOrder } from "./generators";

export const createClient = async (
  client: ReturnType<typeof generateClient>,
  serviceOrder?: ReturnType<typeof generateServiceOrder>
) => {
  const data = {
    ...client,
    serviceOrders: serviceOrder ? { create: [serviceOrder] } : undefined,
  } as Prisma.ClientCreateInput;

  const newClient = await prisma.client.create({
    data,
    include: {
      serviceOrders: !!serviceOrder,
    },
  });

  if (serviceOrder) {
    const newServiceOrder = newClient.serviceOrders[0];
    return { clientId: newClient.id, serviceOrderId: newServiceOrder.id };
  }

  return { clientId: newClient.id };
};
