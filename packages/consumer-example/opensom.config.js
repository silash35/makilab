export default {
  SITE_URL: process.env.SITE_URL ? process.env.SITE_URL : "https://opensom-consumer.herokuapp.com",
  API_URL: process.env.API_URL ? process.env.API_URL : "https://opensom.herokuapp.com/api/search",
  COMPANY: {
    name: "OpenSOM",
    description: "Your Company Description",
    email: "example@example.com",
    phone: "71 9999-9999",
    whatsapp: "55 71 9999-9999", // dont forget to add the country code
  },
};
