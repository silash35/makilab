import { PrismaClient } from "@prisma/client";

import apiFactory from "/src/utils/apiFactory";
import { filterDate, filterNumber, filterString } from "/src/utils/filters";
import parseClient from "/src/utils/parseClient";

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

      if (Number(body.clientID) == 0) {
        await prisma.client.create({
          data: parseOwner(body),
        });
      } else {
        await prisma.client.update({
          where: {
            id: Number(body.clientID),
          },
          data: parseOwner(body),
        });
      }

      res.statusCode = 200;
      res.end();
    } catch (e) {
      res.statusCode = 400;
      res.json({ error: String(e) });
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

const parseOwner = (body) => {
  const owner = parseClient({
    name: body.name,
    email: body.email,
    cpfOrCnpj: body.cpfOrCnpj,
    address: body.address,
    zip: body.zip,
    whatsapp: body.whatsapp,
    tel: body.tel,
  });

  owner.equipment = {
    create: {
      OS_number: filterNumber(body.OS_number),
      name: filterString(body.equipment),
      brand: filterString(body.brand),
      model: filterString(body.model),
      product_number: filterString(body.product_number),
      batchOrImei: filterString(body.batchOrImei),
      accessories: filterString(body.accessories),
      productCondition: filterString(body.productCondition),
      createdAt: filterDate(body.createdAt),
      listOfServices: filterString(body.listOfServices),
      attendedBy: filterString(body.attendedBy),
      attendedOn: filterString(body.attendedOn),
      isUnderWarranty: body.isUnderWarranty === "on",
    },
  };

  return owner;
};

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
