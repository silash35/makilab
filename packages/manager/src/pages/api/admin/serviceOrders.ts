import type { NextApiRequest } from "next";

import prisma from "@/database/prisma";
import apiFactory from "@/utils/backend/apiFactory";
import { parseEditSO, parseUpdateSO } from "@/utils/backend/parsers";

const methods = {
  async GET(req: NextApiRequest) {
    let answer;
    if (req.query.id === undefined) {
      answer = await prisma.serviceOrder.findMany({
        include: {
          owner: true,
        },
      });
    } else {
      answer = await prisma.serviceOrder.findUnique({
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

    return answer;
  },

  async POST(req: NextApiRequest) {
    const body = req.body;

    const serviceOrder = await prisma.serviceOrder.update({
      where: {
        id: Number(body.id),
      },
      data: parseEditSO(body),
    });

    return serviceOrder;
  },

  async PUT(req: NextApiRequest) {
    await prisma.serviceOrder.update({
      where: {
        id: req.body.id,
      },
      data: parseUpdateSO(req.body.data),
    });
  },

  async DELETE(req: NextApiRequest) {
    await prisma.serviceOrder.delete({
      where: {
        id: req.body.id,
      },
    });
  },
};

export default apiFactory(methods);
