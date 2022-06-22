import config from "./config";

type User = Omit<typeof config.USERS[0], "password">;

declare global {
  namespace Express {
    export interface Request {
      user: User;
    }
  }
}
