import config from "@opensom/config";

export default (() => {
  if (!import.meta.env.SITE_URL) {
    throw new Error("SITE_URL is not defined");
  }

  if (import.meta.env.PASSWORD == undefined) {
    throw new Error("PASSWORD env variable not set");
  }

  return {
    SITE_URL: import.meta.env.SITE_URL,
    users: [{ id: 0, name: "admin", accessTypes: ["admin"], password: import.meta.env.PASSWORD }],
    ...config,
  };
})();
