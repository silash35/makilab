import { Request, Response, Router } from "express";

// Constants
const router = Router();

router.get("", async (req: Request, res: Response) => {
  return res.status(200).json({ oi: "Hello Word" });
});

export default router;
