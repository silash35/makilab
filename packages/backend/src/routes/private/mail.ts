import { Request, Response, Router } from "express";

import sendMail from "../../services/sendMail";

const router = Router();

router.post("", async (req: Request, res: Response) => {
  const testMessageUrl = await sendMail(req.body.to, req.body.text);

  return res.status(200).json({ status: "success", testMessageUrl });
});

export default router;
