import { Request, Response, Router } from "express";

import { create, deleteOne, getAll, getOne } from "@/modules/budget/controller";

const router = Router();

router.get("/serviceOrder/:id", async (req: Request, res: Response) => {
  return res.status(200).json(await getAll(req.params.id));
});

router.get("/:id", async (req: Request, res: Response) => {
  return res.status(200).json(await getOne(req.params.id));
});

router.post("", async (req: Request, res: Response) => {
  return res.status(200).json(await create(req.body.serviceOrderId, req.body.budget));
});

router.delete("", async (req: Request, res: Response) => {
  return res.status(200).json(await deleteOne(req.body.id));
});

export default router;
