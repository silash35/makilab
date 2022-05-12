export default (() => {
  return {
    COMPANY: {
      name: "OpenSOM",
      color: "#2ec27e",
      description: "Your Company Description",
      email: "example@example.com",
      phones: ["71 9999-9999", "71 9999-9999"],
      whatsapp: "55 71 9999-9999", // dont forget to add the country code
      city: "Salvador",
    },
    PDF: {
      hasQrCode: true,
      qrCodeLink: "https://opensom-consumer.herokuapp.com/%ID%", // %ID% will be replaced by the equipment id
    },
    ATTENDANTS: ["Dan Cordova", "Larissa Brain", "Tom Coffee"],
    SERVICE_PLACES: ["Balcão", "Telefone"],
  };
})();
