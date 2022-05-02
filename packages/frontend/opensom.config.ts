export default (() => {
  if (!process.env.SITE_URL) {
    throw new Error("SITE_URL is not defined");
  }

  if (!process.env.BACKEND_URL) {
    throw new Error("BACKEND_URL is not defined");
  }

  return {
    SITE_URL: process.env.SITE_URL,
    BACKEND_URL: process.env.BACKEND_URL,
    COMPANY: {
      name: "OpenSOM",
      color: "#2ec27e",
      email: "example@example.com",
      phones: ["71 9999-9999", "71 9999-9999"],
      whatsapp: "55 71 9999-9999", // dont forget to add the country code
      city: "Salvador",
    },
    ATTENDANTS: ["Dan Cordova", "Larissa Brain", "Tom Coffee"],
    SERVICE_PLACES: ["Balcão", "Telefone"],
  };
})();
