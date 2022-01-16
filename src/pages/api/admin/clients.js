import prisma from "@/database/prisma";
import apiFactory from "@/utils/apiFactory";
import { filterDate, filterNumber, filterString } from "@/utils/filters";

const methods = {
  async GET(req, res) {
    try {
      const allClients = await prisma.client.findMany({
        include: {
          equipment: true,
        },
      });

      res.setHeader("Content-Type", "application/json");
      res.statusCode = 200;
      res.json(allClients);
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
          data: parseClient(body),
        });
      } else {
        await prisma.client.update({
          where: {
            id: Number(body.clientID),
          },
          data: parseClient(body),
        });
      }

      res.statusCode = 200;
      res.end();
    } catch (e) {
      res.statusCode = 400;
      res.json({ error: String(e) });
    }
  },
};

export default apiFactory(methods, true);

const parseClient = (body) => {
  const client = {
    name: filterString(body.name),
    email: filterString(body.email),
    cpfOrCnpj: filterString(body.cpfOrCnpj),
    address: filterString(body.address),
    zip: filterNumber(body.zip),
    whatsapp: filterNumber(body.whatsapp),
    tel: filterNumber(body.tel),
  };

  if (body.equipment != undefined) {
    client.equipment = {
      create: {
        name: filterString(body.equipment),
        brand: filterString(body.brand),
        model: filterString(body.model),
        productNumber: filterString(body.productNumber),
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
  }

  return client;
};
