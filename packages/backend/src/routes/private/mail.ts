import { Request, Response, Router } from "express";

import { sendMail } from "../../modules/mail/controller";

const router = Router();

router.post("", async (req: Request, res: Response) => {
  return res.status(200).json(await sendMail(req.body.to, req.body.text));
});

export default router;
