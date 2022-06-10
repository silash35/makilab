import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const protect = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (import.meta.env.JWT_SECRET == undefined) {
    throw new Error("JWT_SECRET env variable not set");
  }

  if (!token) {
    throw new Error("Unauthorized: No token provided");
  }

  try {
    const decoded = jwt.verify(token, import.meta.env.JWT_SECRET);
    req.user = decoded as Request["user"];
    return next();
  } catch (error) {
    throw new Error("Unauthorized: Invalid token");
  }
};

export default protect;
