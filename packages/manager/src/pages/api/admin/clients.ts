import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/database/prisma";
import apiFactory from "@/utils/backend/apiFactory";
import { parseCreateClient, parseUpdateClient } from "@/utils/backend/parsers";

const methods = {
  async GET(req: NextApiRequest, res: NextApiResponse) {
    const allClients = await prisma.client.findMany({
      include: {
        equipment: true,
      },
    });

    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;
    res.json(allClients);
  },

  async POST(req: NextApiRequest, res: NextApiResponse) {
    const body = req.body;

    let client;
    if (Number(body.clientID) == 0) {
      client = await prisma.client.create({
        data: parseCreateClient(body),
        include: {
          equipment: true,
        },
      });
    } else {
      client = await prisma.client.update({
        where: {
          id: Number(body.clientID),
        },
        data: parseUpdateClient(body),
        include: {
          equipment: true,
        },
      });
    }

    res.statusCode = 200;
    res.json(client);
    res.end();
  },

  async DELETE(req: NextApiRequest, res: NextApiResponse) {
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
