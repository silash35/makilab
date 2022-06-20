import config from "@opensom/config";

export default (() => {
  if (!import.meta.env.SITE_URL) {
    throw new Error("SITE_URL is not defined");
  }

  if (!import.meta.env.JWT_SECRET) {
    throw new Error("JWT_SECRET env variable not set");
  }

  const USERS = [
    { id: "1", name: "admin", password: import.meta.env.ADMIN_PASSWORD, privileges: ["admin"] },
    { id: "2", name: "user1", password: import.meta.env.USER1_PASSWORD, privileges: ["admin"] },
    { id: "3", name: "user2", password: import.meta.env.USER2_PASSWORD, privileges: ["admin"] },
  ];

  USERS.forEach((user) => {
    if (user.password.length < 2) {
      throw new Error("PASSWORD env variable not set or too short");
    }
  });

  return {
    SITE_URL: import.meta.env.SITE_URL,
    SILENT: import.meta.env.SILENT === "true",
    JWT_SECRET: import.meta.env.JWT_SECRET,
    EMAIL: {
      host: import.meta.env.EMAIL_HOST,
      user: import.meta.env.EMAIL_USER,
      password: import.meta.env.EMAIL_PASSWORD,
    },
    USERS,
    ...config,
  };
})();
