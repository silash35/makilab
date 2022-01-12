import { PrismaClient } from "@prisma/client";

import apiFactory from "/src/utils/apiFactory";
import { filterDate } from "/src/utils/filters";

const prisma = new PrismaClient();

const methods = {
  async GET(req, res) {
    try {
      const allEquipments = await prisma.equipment.findMany({
        include: {
          owner: true,
        },
      });

      res.setHeader("Content-Type", "application/json");
      res.statusCode = 200;
      res.json(allEquipments);
    } catch (err) {
      res.statusCode = 500;
      res.end("Internal Server Error");
    }
  },

  async PUT(req, res) {
    try {
      await prisma.equipment.update({
        where: {
          id: req.body.id,
        },
        data: processEditEquipment(req.body.data),
      });
      res.statusCode = 200;
      res.end();
    } catch (e) {
      res.end(String(e));
    }
  },
};

export default apiFactory(methods, true);

const processEditEquipment = (data) => {
  const newData = {
    createdAt: filterDate(data.createdAt),
    registeredInManufacturerAt: filterDate(data.registeredInManufacturerAt),
    avalietedAt: filterDate(data.avalietedAt),
    budgetAnsweredAt: filterDate(data.budgetAnsweredAt),
    partsArrivedAt: filterDate(data.partsArrivedAt),
    repairedAt: filterDate(data.repairedAt),
    deliveredToCustomerAt: filterDate(data.deliveredToCustomerAt),
  };

  if (data.isBudgetApproved === null && filterDate(data.budgetAnsweredAt) != null) {
    newData.isBudgetApproved = false;
  } else {
    newData.isBudgetApproved =
      typeof data.isBudgetApproved == "boolean" ? data.isBudgetApproved : undefined;
  }

  return newData;
};
