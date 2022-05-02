import { Request, Response, Router } from "express";

import { create, deleteOne, getAll, update } from "../../services/client";
import { filterNumber } from "../../utils/filters";
import { parseCreateClient, parseUpdateClient } from "../../utils/parsers";

const router = Router();

router.get("", async (req: Request, res: Response) => {
  return res.status(200).json(await getAll());
});

router.post("", async (req: Request, res: Response) => {
  const body = req.body;
  const client = await create(parseCreateClient(body, body));

  return res.status(200).json(client);
});

router.put("", async (req: Request, res: Response) => {
  const body = req.body;
  const id = filterNumber(body.clientID);

  if (id === null) {
    throw new Error("Invalid data: clientID");
  }

  return res.status(200).json(await update(id, parseUpdateClient(body, body)));
});

router.delete("", async (req: Request, res: Response) => {
  const id = filterNumber(req.body.id);
  if (id === null) {
    throw new Error("Invalid data: id");
  }

  await deleteOne(id);
  return res.status(200).send({ ok: true });
});

export default router;
