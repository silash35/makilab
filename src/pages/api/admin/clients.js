import { PrismaClient } from "@prisma/client";
import cookie from "cookie";
import jwt from "jsonwebtoken";

import parseClient from "/src/utils/parseClient";

const prisma = new PrismaClient();

export default async function Equipments(req, res) {
  const methods = {
    async GET() {
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

    async POST() {
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

    async PUT() {
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
