declare namespace config {
  const COMPANY: {
    name: string;
    color: string;
    description: string;
    email: string;
    phones: string[];
    whatsapp: string; // dont forget to add the country code
    city: string;
  };
}

export default config;
