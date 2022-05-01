import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const auth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (process.env.JWT_SECRET == undefined) {
    throw new Error("JWT_SECRET env variable not set");
  }

  if (!token) {
    throw new Error("No token provided");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  req.user = (decoded as { user: { name: string; accessTypes: string[] } }).user;

  return next();
};

export default auth;
