import { Router } from "express";

import { signIn } from "./controller";

const router = Router();

router.get("/user", async (req, res) => {
  return res.status(200).json(req.user);
});

router.post("/signin", async (req, res) => {
  return res.status(200).json(await signIn(req.body.user, req.body.password));
});

export default router;
