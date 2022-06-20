import config from "@config";
import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const authentication = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    throw new Error("Unauthorized: No token provided");
  }

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);
    req.user = decoded as Request["user"];
    return next();
  } catch (error) {
    throw new Error("Unauthorized: Invalid token");
  }
};

export default authentication;
