import users from "../config/users";

type User = Omit<typeof users[0], "password">;

export default User;
