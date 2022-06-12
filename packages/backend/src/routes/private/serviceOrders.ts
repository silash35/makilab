import { Request, Response, Router } from "express";

import { deleteOne, getAll, getOne, update, updateStatus } from "@/modules/serviceOrder/controller";

const router = Router();

router.get("", async (req: Request, res: Response) => {
  return res.status(200).json(await getAll());
});

router.get("/:id", async (req: Request, res: Response) => {
  return res.status(200).json(await getOne(req.params.id));
});

router.post("", async (req: Request, res: Response) => {
  return res.status(200).json(await update(req.body.id, req.body));
});

router.put("", async (req: Request, res: Response) => {
  return res.status(200).json(await updateStatus(req.body.id, req.body));
});

router.delete("", async (req: Request, res: Response) => {
  return res.status(200).json(await deleteOne(req.body.id));
});

export default router;
