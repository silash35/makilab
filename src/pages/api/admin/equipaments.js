import { PrismaClient } from "@prisma/client";
import cookie from "cookie";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export default async function product(req, res) {
  // Verify if user is authenticated
  try {
    const cookies = cookie.parse(req.headers.cookie);
    jwt.verify(cookies?.[process.env.COOKIE_NAME], process.env.PASSWORD);
  } catch (err) {
    res.statusCode = 401;
    res.end("Unauthorized");
  }

  try {
    const allEquipments = await prisma.equipment.findMany();
    res.statusCode = 200;
    res.json(allEquipments);
  } catch (err) {
    res.statusCode = 500;
    res.end("Internal Server Error");
  }
}
