import prisma from "@/database/prisma";
import apiFactory from "@/utils/apiFactory";
import { filterDate, filterString } from "@/utils/filters";

const methods = {
  async GET(req, res) {
    let answer;
    if (req.query.id === undefined) {
      answer = await prisma.equipment.findMany({
        include: {
          owner: true,
        },
      });
    } else {
      answer = await prisma.equipment.findUnique({
        where: {
          id: Number(req.query.id),
        },
        include: {
          owner: true,
        },
      });
    }

    if (!answer) {
      throw { name: "Not Found" };
    }

    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;
    res.json(answer);
  },

  async POST(req, res) {
    const body = req.body;

    const equipment = await prisma.equipment.update({
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
        notes: filterString(body.notes),
        wasEdited: true,
      },
    });
    res.statusCode = 200;
    res.json(equipment);
  },

  async PUT(req, res) {
    await prisma.equipment.update({
      where: {
        id: req.body.id,
      },
      data: processUpdateEquipment(req.body.data),
    });
    res.statusCode = 200;
    res.end();
  },

  async DELETE(req, res) {
    await prisma.equipment.delete({
      where: {
        id: req.body.id,
      },
    });
    res.statusCode = 200;
    res.end();
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
