import config from "../config";

type User = Omit<typeof config.users[0], "password">;

export default User;
