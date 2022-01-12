import { PrismaClient } from "@prisma/client";
import cookie from "cookie";
import jwt from "jsonwebtoken";

import { filterDate, filterNumber, filterString } from "/src/utils/filters";
import parseClient from "/src/utils/parseClient";

const prisma = new PrismaClient();

export default async function Equipments(req, res) {
  const methods = {
    async GET() {
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

    async POST() {
      try {
        const body = req.body;

        /*
        await prisma.client.upsert({
          data: parseNewEquipment(body),
        });

        await prisma.equipment.create({
          data: parseNewEquipment(body),
        });

        if (body.clientID != 0) {
          prisma.client.update({
            where: {
              id: body.clientID,
            },
            data: parseClient({
              name: body.name,
              email: body.email,
              cpfOrCnpj: body.cpfOrCnpj,
              address: body.address,
              zip: body.zip,
              whatsapp: body.whatsapp,
              tel: body.tel,
            }),
          });
        }
        */

        res.statusCode = 200;
        res.end();
      } catch (e) {
        res.statusCode = 400;
        res.json({ error: String(e) });
      }
    },

    async PUT() {
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

  try {
    // Verify if user is authenticated
    const cookies = cookie.parse(req.headers.cookie);
    jwt.verify(cookies?.[process.env.COOKIE_NAME], process.env.PASSWORD);

    // Run requestedMethod
    const requestedMethod = methods[req.method];
    if (requestedMethod != undefined) {
      await requestedMethod();
    } else {
      res.statusCode = 404;
    }
  } catch (err) {
    res.statusCode = 401;
    res.end("Unauthorized");
  }
}

const parseNewEquipment = (body) => {
  let owner = {};

  if (body.clientID == 0) {
    const client = parseClient({
      id: body.clientID,
      name: body.name,
      email: body.email,
      cpfOrCnpj: body.cpfOrCnpj,
      address: body.address,
      zip: body.zip,
      whatsapp: body.whatsapp,
      tel: body.tel,
    });

    client.id = null;
    owner.create = client;
  } else {
    owner.connect = {
      id: body.clientID,
    };
  }

  const newBody = {
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
    owner: owner,
  };

  return newBody;
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
