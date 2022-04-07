export default {
  SITE_URL: process.env.SITE_URL ? process.env.SITE_URL : "https://opensom.herokuapp.com",
  COMPANY: {
    name: "OpenSOM",
    email: "example@example.com",
    phones: ["71 9999-9999", "71 9999-9999"],
    whatsapp: "55 71 9999-9999", // dont forget to add the country code
    city: "Salvador",
  },
  ATTENDANTS: ["Dan	Cordova", "Larissa Brain", "Tom	Coffee"],
  SERVICE_PLACES: ["Balcão", "Telefone"],
  PDF: {
    hasQrCode: true,
    qrCodeLink: "https://opensom.herokuapp.com/%ID%", // %ID% will be replaced by the equipment id
  },
};
