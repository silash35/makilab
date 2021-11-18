import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function product(req, res) {
  try {
    if (!isNaN(req.body.id)) {
      let search = Number(req.body.id);

      const equipment = await prisma.equipment.findUnique({
        where: {
          id: search,
        },
      });
      res.json({ name: equipment?.name, status: equipment?.status });
    } else {
      res.json({});
    }
    res.statusCode = 200;
  } catch (err) {
    res.statusCode = 500;
    res.end("Internal Server Error");
  }
}
