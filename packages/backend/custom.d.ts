import User from "./src/types/user";

declare global {
  declare namespace Express {
    export interface Request {
      user?: User;
    }
  }
}
