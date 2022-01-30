import prisma from "@/database/prisma";
import apiFactory from "@/utils/apiFactory";
import {
  filterCpfOrCnpj,
  filterDate,
  filterPhoneNumber,
  filterString,
  filterZip,
} from "@/utils/filters";

const methods = {
  async GET(req, res) {
    const allClients = await prisma.client.findMany({
      include: {
        equipment: true,
      },
    });

    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;
    res.json(allClients);
  },

  async POST(req, res) {
    const body = req.body;

    let client;
    if (Number(body.clientID) == 0) {
      client = await prisma.client.create({
        data: parseClient(body),
        include: {
          equipment: true,
        },
      });
    } else {
      client = await prisma.client.update({
        where: {
          id: Number(body.clientID),
        },
        data: parseClient(body),
        include: {
          equipment: true,
        },
      });
    }

    res.statusCode = 200;
    res.json(client);
    res.end();
  },

  async DELETE(req, res) {
    await prisma.equipment.deleteMany({
      where: {
        ownerId: req.body.id,
      },
    });
    await prisma.client.delete({
      where: {
        id: req.body.id,
      },
    });

    res.statusCode = 200;
    res.end();
  },
};

export default apiFactory(methods, true);

const parseClient = (body) => {
  const client = {
    name: filterString(body.name),
    email: filterString(body.email),
    cpfOrCnpj: filterCpfOrCnpj(body.cpfOrCnpj),
    address: filterString(body.address),
    zip: filterZip(body.zip),
    whatsapp: filterPhoneNumber(body.whatsapp),
    tel: filterPhoneNumber(body.tel),
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
        notes: filterString(body.notes),
      },
    };
  }

  return client;
};
