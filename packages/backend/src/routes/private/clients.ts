import { Request, Response, Router } from "express";

import { create, deleteOne, getAll, update } from "../../services/client";
import { filterNumber } from "../../utils/filters";
import { parseClient } from "../../utils/parsers";

const router = Router();

router.get("", async (req: Request, res: Response) => {
  return res.status(200).json(await getAll());
});

router.post("", async (req: Request, res: Response) => {
  const { client, serviceOrder } = req.body;
  const newClient = await create(parseClient(client, serviceOrder));

  return res.status(200).json(newClient);
});

router.put("", async (req: Request, res: Response) => {
  const { client, serviceOrder } = req.body;
  const id = filterNumber(req.body.clientID);

  if (id === null) {
    throw new Error("Invalid data: clientID");
  }

  return res.status(200).json(await update(id, parseClient(client, serviceOrder)));
});

router.delete("", async (req: Request, res: Response) => {
  const id = filterNumber(req.body.id);
  if (id === null) {
    throw new Error("Invalid data: id");
  }

  await deleteOne(id);
  return res.status(200).json({ deletedID: id });
});

export default router;
