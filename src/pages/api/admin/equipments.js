import { PrismaClient } from "@prisma/client";
import cookie from "cookie";
import jwt from "jsonwebtoken";

import { filterNumber, filterString } from "/src/utils/filters";
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
        await prisma.equipment.create({
          data: parseNewEquipment(req.body),
        });
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

  let owner = {};

  if (client.id == 0) {
    client.id = undefined;
    owner.create = client;
  } else {
    owner.update = {
      where: {
        id: client.id,
      },
      data: client,
    };
  }

  const newBody = {
    OS_number: filterNumber(body.OS_number),
    name: filterString(body.equipment),
    brand: filterString(body.brand),
    model: filterString(body.model),
    attendedBy: filterString(body.attendedBy),
    isUnderWarranty: body.isUnderWarranty === "on",
    createdAt: filterString(body.createdAt),
    owner: owner,
  };

  return newBody;
};

const processEditEquipment = (data) => {
  const newData = {
    createdAt: filterString(data.createdAt),
    registeredInManufacturerAt: filterString(data.registeredInManufacturerAt),
    avalietedAt: filterString(data.avalietedAt),
    budgetAnsweredAt: filterString(data.budgetAnsweredAt),
    partsArrivedAt: filterString(data.partsArrivedAt),
    repairedAt: filterString(data.repairedAt),
    deliveredToCustomerAt: filterString(data.deliveredToCustomerAt),
  };

  if (data.isBudgetApproved === null && filterString(data.budgetAnsweredAt) != null) {
    newData.isBudgetApproved = false;
  } else {
    newData.isBudgetApproved =
      typeof data.isBudgetApproved == "boolean" ? data.isBudgetApproved : undefined;
  }

  return newData;
};
