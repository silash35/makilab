import { Request, Response, Router } from "express";

import { deleteOne, getAll, getOne, update } from "../../services/serviceOrder";
import { parseUpdateSO, parseUpdateStatusSO } from "../../utils/parsers";

const router = Router();

router.get("", async (req: Request, res: Response) => {
  let answer;
  if (req.query.id === undefined) {
    answer = await getAll();
  } else {
    answer = await getOne(
      Array.isArray(req.query.id) ? Number(req.query.id[0]) : Number(req.query.id)
    );
  }

  if (!answer) {
    throw new Error("Not Found");
  }

  return res.status(200).json(answer);
});

router.post("", async (req: Request, res: Response) => {
  const updatedSO = await update(Number(req.body.id), parseUpdateSO(req.body));
  return res.status(200).json(updatedSO);
});

router.put("", async (req: Request, res: Response) => {
  const updatedSO = await update(Number(req.body.id), parseUpdateStatusSO(req.body));
  return res.status(200).json(updatedSO);
});

router.delete("", async (req: Request, res: Response) => {
  await deleteOne(Number(req.body.id));
  return res.status(200).send(req.body.id + " deleted");
});

export default router;
