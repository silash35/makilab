import config from "@config";
import jwt from "jsonwebtoken";

const USERS = config.USERS;

const signIn = async (name: unknown, password: unknown) => {
  const user = USERS.find((u) => u.name === name);

  if (!user) {
    throw new Error("Unauthorized: User not found");
  }

  if (password !== user.password) {
    throw new Error("Unauthorized: Invalid password");
  }

  const userWithoutPassword = { ...user, password: undefined };

  const token = jwt.sign(userWithoutPassword, config.JWT_SECRET, {
    expiresIn: 86400 * 7, // expires in 7 days
  });

  return { token, user: userWithoutPassword };
};

export { signIn };
