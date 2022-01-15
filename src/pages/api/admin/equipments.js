import { PrismaClient } from "@prisma/client";

import apiFactory from "@/utils/apiFactory";
import { filterDate, filterString } from "@/utils/filters";

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

  async POST(req, res) {
    try {
      const body = req.body;

      await prisma.equipment.update({
        where: {
          id: Number(body.id),
        },
        data: {
          name: filterString(body.equipment),
          brand: filterString(body.brand),
          model: filterString(body.model),
          productNumber: filterString(body.productNumber),
          batchOrImei: filterString(body.batchOrImei),
          accessories: filterString(body.accessories),
          productCondition: filterString(body.productCondition),
          listOfServices: filterString(body.listOfServices),
          attendedBy: filterString(body.attendedBy),
          attendedOn: filterString(body.attendedOn),
          isUnderWarranty: body.isUnderWarranty === "on",
          wasEdited: true,
        },
      });
      res.statusCode = 200;
      res.end();
    } catch (e) {
      res.end(String(e));
    }
  },

  async PUT(req, res) {
    try {
      await prisma.equipment.update({
        where: {
          id: req.body.id,
        },
        data: processUpdateEquipment(req.body.data),
      });
      res.statusCode = 200;
      res.end();
    } catch (e) {
      res.end(String(e));
    }
  },
};

export default apiFactory(methods, true);

const processUpdateEquipment = (data) => {
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
