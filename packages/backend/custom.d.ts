import config from "./config";

type UsersWithPassword = typeof config.USERS;
type User = Omit<UsersWithPassword[number], "password">;

declare global {
  namespace Express {
    export interface Request {
      user: User;
    }
  }
}
