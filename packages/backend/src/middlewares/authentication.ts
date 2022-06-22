import config from "@config";
import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const authentication = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  const anonymous = { id: "0", name: "anonymous", privileges: [] as string[] };

  if (token) {
    try {
      const decoded = jwt.verify(token, config.JWT_SECRET);
      req.user = decoded as Request["user"];
    } catch (error) {
      req.user = anonymous;
    }
  } else {
    req.user = anonymous;
  }

  return next();
};

export default authentication;
