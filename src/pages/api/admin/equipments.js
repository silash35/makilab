import { PrismaClient } from "@prisma/client";
import cookie from "cookie";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export default async function Equipments(req, res) {
  // Verify if user is authenticated
  try {
    const cookies = cookie.parse(req.headers.cookie);
    jwt.verify(cookies?.[process.env.COOKIE_NAME], process.env.PASSWORD);
  } catch (err) {
    res.statusCode = 401;
    res.end("Unauthorized");
  }

  const methods = {
    async GET() {
      try {
        const allEquipments = await prisma.equipment.findMany();

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
          data: processNewEquipment(req.body),
        });

        res.writeHead(302, {
          Location: "/admin",
        });
        res.end();
      } catch (e) {
        res.end(String(e));
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

  const requestedMethod = methods[req.method];
  if (requestedMethod != undefined) {
    await requestedMethod();
  } else {
    res.statusCode = 404;
  }
}

const processNewEquipment = (body) => {
  const newBody = {
    OS_number: Number(body.OS_number),
    name: filterString(body.name),
    brand: filterString(body.brand),
    model: filterString(body.model),
    attendedBy: filterString(body.attendedBy),
    isUnderWarranty: body.isUnderWarranty === "on",
    createdAt: stringToDate(body.createdAt),
    owner: {
      connect: {
        id: 1,
      },
    },
  };

  return newBody;
};

const processEditEquipment = (data) => {
  const newData = {
    createdAt: filterString(data.createdAt),
    registeredInManufacturerAt: filterString(data.registeredInManufacturerAt),
    avalietedAt: filterString(data.avalietedAt),
    budgetAnsweredAt: filterString(data.budgetAnsweredAt),
    isBudgetApproved: typeof data.isBudgetApproved == "boolean" ? data.isBudgetApproved : undefined,
    partsArrivedAt: filterString(data.partsArrivedAt),
    repairedAt: filterString(data.repairedAt),
    deliveredToCustomerAt: filterString(data.deliveredToCustomerAt),
  };
  return newData;
};

const stringToDate = (string) => {
  if (filterString(string) === undefined) {
    return null;
  } else {
    return new Date(`${string}`);
  }
};

const filterString = (string) => {
  if (typeof string === "string" && string.length > 1) {
    return string;
  } else {
    return null;
  }
};
