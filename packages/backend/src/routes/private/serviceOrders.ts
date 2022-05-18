import { Request, Response, Router } from "express";

import { deleteOne, getAll, getOne, update } from "../../services/serviceOrder";
import { filterNumber } from "../../utils/filters";
import { parseSO, parseStatusSO } from "../../utils/parsers";

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
  const updatedSO = await update(Number(req.body.id), parseSO(req.body));
  return res.status(200).json(updatedSO);
});

router.put("", async (req: Request, res: Response) => {
  const updatedSO = await update(Number(req.body.id), parseStatusSO(req.body));
  return res.status(200).json(updatedSO);
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
