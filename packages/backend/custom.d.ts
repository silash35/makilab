import config from "./src/config";

type User = Omit<typeof config.users[0], "password">;

declare global {
  namespace Express {
    export interface Request {
      user?: User;
    }
  }
}
