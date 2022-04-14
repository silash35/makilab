import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/database/prisma";
import apiFactory from "@/utils/backend/apiFactory";
import { parseEditEquipment, parseUpdateEquipment } from "@/utils/backend/parsers";

const methods = {
  async GET(req: NextApiRequest, res: NextApiResponse) {
    let answer;
    if (req.query.id === undefined) {
      answer = await prisma.equipment.findMany({
        include: {
          owner: true,
        },
      });
    } else {
      answer = await prisma.equipment.findUnique({
        where: {
          id: Number(req.query.id),
        },
        include: {
          owner: true,
        },
      });
    }

    if (!answer) {
      throw new Error("Not Found");
    }

    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;
    res.json(answer);
  },

  async POST(req: NextApiRequest, res: NextApiResponse) {
    const body = req.body;

    const equipment = await prisma.equipment.update({
      where: {
        id: Number(body.id),
      },
      data: parseEditEquipment(body),
    });
    res.statusCode = 200;
    res.json(equipment);
  },

  async PUT(req: NextApiRequest, res: NextApiResponse) {
    await prisma.equipment.update({
      where: {
        id: req.body.id,
      },
      data: parseUpdateEquipment(req.body.data),
    });
    res.statusCode = 200;
    res.end();
  },

  async DELETE(req: NextApiRequest, res: NextApiResponse) {
    await prisma.equipment.delete({
      where: {
        id: req.body.id,
      },
    });
    res.statusCode = 200;
    res.end();
  },
};

export default apiFactory(methods, true);
