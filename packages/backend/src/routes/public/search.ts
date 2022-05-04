import { Request, Response, Router } from "express";

import { getOnePublic } from "../../services/serviceOrder";

const router = Router();

router.post("", async (req: Request, res: Response) => {
  const search = String(req.body.search);

  // Remove all non-numeric characters
  const searchID = search.replace(/\D/g, "");

  if (!(searchID.length > 0)) {
    throw new Error("Invalid data: search ID must be a number");
  }

  const equipment = await getOnePublic(Number(searchID));

  if (equipment === null) {
    throw new Error("Not Found");
  }

  return res.status(200).json(equipment);
});

export default router;
