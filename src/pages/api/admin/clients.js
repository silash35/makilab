import { PrismaClient } from "@prisma/client";

import apiFactory from "/src/utils/apiFactory";
import parseClient from "/src/utils/parseClient";

const prisma = new PrismaClient();

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
      await prisma.client.create({
        data: parseClient(req.body),
      });
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
        data: parseClient(req.body.data),
      });
      res.statusCode = 200;
      res.end();
    } catch (e) {
      res.end(String(e));
    }
  },
};

export default apiFactory(methods, true);
