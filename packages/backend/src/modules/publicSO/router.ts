import { Request, Response, Router } from "express";

import { getOne } from "./controller";

const router = Router();

router.post("", async (req: Request, res: Response) => {
  return res.status(200).json(await getOne(req.body.search));
});

export default router;
