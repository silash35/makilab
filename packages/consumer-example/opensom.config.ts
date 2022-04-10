export default (() => {
  if (!process.env.SITE_URL) {
    throw new Error("SITE_URL is not defined");
  }
  if (!process.env.API_URL) {
    throw new Error("API_URL is not defined");
  }

  return {
    SITE_URL: process.env.SITE_URL,
    API_URL: process.env.API_URL,
    COMPANY: {
      name: "OpenSOM",
      description: "Your Company Description",
      email: "example@example.com",
      phone: "71 9999-9999",
      whatsapp: "55 71 9999-9999", // dont forget to add the country code
    },
  };
})();
