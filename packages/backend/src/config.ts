import config from "@opensom/config";

export default (() => {
  if (!process.env.SITE_URL) {
    throw new Error("SITE_URL is not defined");
  }

  if (process.env.PASSWORD == undefined) {
    throw new Error("PASSWORD env variable not set");
  }

  return {
    SITE_URL: process.env.SITE_URL,
    users: [{ id: 0, name: "admin", accessTypes: ["admin"], password: process.env.PASSWORD }],
    ...config,
  };
})();
