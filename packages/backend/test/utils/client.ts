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
      serviceOrders: true,
    },
  });

  if (serviceOrder) {
    expect(newClient.serviceOrders).to.be.an("array");
    expect(newClient.serviceOrders).to.have.length(1);

    const newServiceOrder = newClient.serviceOrders[0];
    return { clientId: newClient.id, serviceOrderId: newServiceOrder.id };
  }

  return { clientId: newClient.id };
};
