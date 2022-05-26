import { Request, Response, Router } from "express";

import { create, deleteOne, getAll, update } from "../../modules/client/controller";

const router = Router();

router.get("", async (req: Request, res: Response) => {
  return res.status(200).json(await getAll());
});

router.post("", async (req: Request, res: Response) => {
  const { client, serviceOrder } = req.body;
  return res.status(200).json(await create(client, serviceOrder));
});

router.put("", async (req: Request, res: Response) => {
  const { clientID, client, serviceOrder } = req.body;
  return res.status(200).json(await update(clientID, client, serviceOrder));
});

router.delete("", async (req: Request, res: Response) => {
  return res.status(200).json(await deleteOne(req.body.id));
});

export default router;
