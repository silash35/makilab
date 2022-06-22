import type { NextFunction, Request, Response } from "express";

const authorization = (privilege = "admin") => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user.privileges.find((p) => p === privilege);

    if (user) {
      return next();
    } else {
      throw new Error("Unauthorized: User does not have the specified privilege:" + privilege);
    }
  };
};

export default authorization;
