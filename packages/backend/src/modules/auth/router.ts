import { Router } from "express";

import authentication from "@/middlewares/authentication";

import { signIn } from "./controller";

const router = Router();

router.get("/user", authentication, async (req, res) => {
  return res.status(200).json(req.user);
});

router.post("/signin", async (req, res) => {
  return res.status(200).json(await signIn(req.body.user, req.body.password));
});

export default router;
