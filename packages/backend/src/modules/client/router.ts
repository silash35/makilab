import { Request, Response, Router } from "express";

import { create, deleteOne, getAll, update } from "./controller";

const router = Router();

router.get("", async (req: Request, res: Response) => {
  return res.status(200).json(await getAll(req.query));
});

router.post("", async (req: Request, res: Response) => {
  const { client, serviceOrder } = req.body;
  return res.status(200).json(await create(client, serviceOrder));
});

router.put("", async (req: Request, res: Response) => {
  const { clientId, client, serviceOrder } = req.body;
  return res.status(200).json(await update(clientId, client, serviceOrder));
});

router.delete("", async (req: Request, res: Response) => {
  return res.status(200).json(await deleteOne(req.body.id));
});

export default router;
