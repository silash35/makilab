import { Request, Response, Router } from "express";

import authMiddleware from "@/middlewares/auth";
import { create, deleteOne, getAll, update } from "@/services/client";
import { parseCreateClient, parseUpdateClient } from "@/utils/parsers";

const router = Router();
router.use(authMiddleware);

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
  const id = Number(body.clientID);

  if (isNaN(id)) {
    throw new Error("Invalid data: clientID");
  }

  return res.status(200).json(await update(id, parseUpdateClient(body, body)));
});

router.delete("", async (req: Request, res: Response) => {
  await deleteOne(Number(req.body.id));

  return res.status(200).send({ ok: true });
});

export default router;
