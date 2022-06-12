import { Request, Response, Router } from "express";
import multer from "multer";

import { sendMail } from "./controller";

const router = Router();

router.post("", multer().single("attachment"), async (req: Request, res: Response) => {
  return res.status(200).json(await sendMail(req.body.to, req.body.text, req.file));
});

export default router;
