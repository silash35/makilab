import type { ServiceOrder } from "@prisma/client";
import type { NextApiRequest } from "next";

import prisma from "@/database/prisma";
import apiFactory from "@/utils/backend/apiFactory";

const methods = {
  async POST(req: NextApiRequest) {
    const search = req.body.search as string;

    // Remove all non-numeric characters
    const searchID = search.replace(/\D/g, "");

    if (!(searchID.length > 0)) {
      throw new Error("Not Found");
    }

    const equipment = await prisma.serviceOrder.findUnique({
      where: {
        id: Number(searchID),
      },
    });

    if (equipment === null) {
      throw new Error("Not Found");
    }

    return parseServiceOrder(equipment);
  },
};

export default apiFactory(methods, false, true);

function removeNull(string: string | undefined | null): string {
  if (string != null) {
    return string;
  } else {
    return "";
  }
}

const parseServiceOrder = (serviceOrder: ServiceOrder) => {
  const parsedServiceOrder = {
    id: serviceOrder.id,
    name: `${serviceOrder.equipment} ${removeNull(serviceOrder.brand)} ${removeNull(
      serviceOrder.model
    )}`,
    isUnderWarranty: serviceOrder.isUnderWarranty,
    isBudgetApproved: serviceOrder.isBudgetApproved,

    createdAt: serviceOrder.createdAt,
    budgetedAt: serviceOrder.budgetedAt,
    budgetAnsweredAt: serviceOrder.budgetAnsweredAt,
    repairedAt: serviceOrder.repairedAt,
    deliveredToCustomerAt: serviceOrder.deliveredToCustomerAt,
  };
  return parsedServiceOrder;
};
