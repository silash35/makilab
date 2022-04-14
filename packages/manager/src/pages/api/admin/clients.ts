import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/database/prisma";
import apiFactory from "@/utils/backend/apiFactory";
import { parseCreateClient, parseUpdateClient } from "@/utils/backend/parsers";

const methods = {
  async GET() {
    const allClients = await prisma.client.findMany({
      include: {
        serviceOrder: true,
      },
    });

    return allClients;
  },

  async POST(req: NextApiRequest) {
    const body = req.body;

    let client;
    if (Number(body.clientID) == 0) {
      client = await prisma.client.create({
        data: parseCreateClient(body),
        include: {
          serviceOrder: true,
        },
      });
    } else {
      client = await prisma.client.update({
        where: {
          id: Number(body.clientID),
        },
        data: parseUpdateClient(body),
        include: {
          serviceOrder: true,
        },
      });
    }

    return client;
  },

  async DELETE(req: NextApiRequest, res: NextApiResponse) {
    await prisma.serviceOrder.deleteMany({
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

export default apiFactory(methods);
