import config from "@config";
import { Router } from "express";
import jwt from "jsonwebtoken";

const user = config.users[0];

const router = Router();

router.post("", async (req, res) => {
  const { password } = req.body;

  if (import.meta.env.JWT_SECRET == undefined) {
    throw new Error("JWT_SECRET env variable not set");
  }

  if (password !== user.password) {
    throw new Error("Unauthorized: Invalid password");
  }

  const userWithoutPassword = { ...user, password: undefined };

  const token = jwt.sign(userWithoutPassword, import.meta.env.JWT_SECRET, {
    expiresIn: 86400 * 7, // expires in 7 days
  });

  return res.status(200).json({ token, userWithoutPassword });
});

export default router;
