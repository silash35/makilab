import { PrismaClient } from "@prisma/client";
import cookie from "cookie";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export default async function clients(req, res) {
  // Verify if user is authenticated
  try {
    const cookies = cookie.parse(req.headers.cookie);
    const cookieName = "authorization";
    jwt.verify(cookies?.[cookieName], process.env.PASSWORD);
  } catch (err) {
    res.statusCode = 401;
    res.end("Unauthorized");
  }

  try {
    let search = req.body.id;
    console.log(search);
    console.log(req.body.id);

    if (search) {
      search = Number(search);
    } else {
      throw "not a valid search";
    }

    const equipment = await prisma.equipment.findUnique({
      where: {
        id: search,
      },
    });
    res.statusCode = 200;
    res.json(equipment);
  } catch (err) {
    if (err == "not a valid search") {
      res.statusCode = 400;
      res.end("Bad Request");
    } else {
      res.statusCode = 500;
      res.end("Internal Server Error");
    }
  }
}
