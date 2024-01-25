import config from "@opensom/config";

export default (() => {
  if (!process.env.SITE_URL) {
    throw new Error("SITE_URL is not defined");
  }

  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET env variable not set");
  }

  const USERS = [
    { id: "1", name: "admin", password: process.env.ADMIN_PASSWORD, privileges: ["admin"] },
    { id: "2", name: "user1", password: process.env.USER1_PASSWORD, privileges: ["admin"] },
    { id: "3", name: "user2", password: process.env.USER2_PASSWORD, privileges: ["admin"] },
  ];

  USERS.forEach((user) => {
    if (user.password?.length != undefined && user.password?.length < 2) {
      throw new Error("PASSWORD env variable not set or too short");
    }
  });

  return {
    SITE_URL: process.env.SITE_URL,
    SILENT: process.env.SILENT === "true",
    JWT_SECRET: process.env.JWT_SECRET,
    EMAIL: {
      host: process.env.EMAIL_HOST,
      user: process.env.EMAIL_USER,
      password: process.env.EMAIL_PASSWORD,
    },
    USERS,
    ...config,
  };
})();
