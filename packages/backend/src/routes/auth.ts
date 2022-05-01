import { Router } from "express";
import jwt from "jsonwebtoken";

const authRouter = Router();

authRouter.post("/signin", async (req, res) => {
  const { password } = req.body;

  if (process.env.PASSWORD == undefined) {
    throw new Error("PASSWORD env variable not set");
  }

  if (process.env.JWT_SECRET == undefined) {
    throw new Error("JWT_SECRET env variable not set");
  }

  if (password !== process.env.PASSWORD) {
    throw new Error("Invalid password");
  }

  const token = jwt.sign(
    { user: { name: "admin", accessTypes: ["admin"] } },
    process.env.JWT_SECRET,
    {
      expiresIn: 86400 * 7, // expires in 7 days
    }
  );

  return res.json({ token });
});

export default authRouter;
