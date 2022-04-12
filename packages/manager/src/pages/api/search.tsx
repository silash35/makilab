import { Equipment } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/database/prisma";
import apiFactory from "@/utils/apiFactory";
import removeNull from "@/utils/removeNull";

const methods = {
  async POST(req: NextApiRequest, res: NextApiResponse) {
    const search = req.body.search as string;
    const searchID = search.replace(/[^0-9]/g, "");

    if (searchID.length > 0) {
      throw { name: "Not Found" };
    }

    const equipment = await prisma.equipment.findUnique({
      where: {
        id: Number(searchID),
      },
    });

    if (equipment === null) {
      throw { name: "Not Found" };
    }

    res.json(filterEquipment(equipment));
    res.statusCode = 200;
  },
};

export default apiFactory(methods, false, true);

const filterEquipment = (equipment: Equipment) => {
  const filteredEquipment = {
    id: equipment.id,
    name: `${equipment.name} ${removeNull(equipment.brand)} ${removeNull(equipment.model)}`,
    isUnderWarranty: equipment.isUnderWarranty,
    isBudgetApproved: equipment.isBudgetApproved,

    createdAt: equipment.createdAt,
    evaluatedAt: equipment.evaluatedAt,
    budgetAnsweredAt: equipment.budgetAnsweredAt,
    repairedAt: equipment.repairedAt,
    deliveredToCustomerAt: equipment.deliveredToCustomerAt,
  };

  return filteredEquipment;
};
