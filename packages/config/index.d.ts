declare namespace config {
  const COMPANY: {
    name: string;
    color: string;
    description: string;
    email: string;
    phones: string[];
    whatsapp: string;
    city: string;
  };
  const PDF: {
    hasQrCode: boolean;
    qrCodeLink: string;
  };
  const ATTENDANTS: string[];
  const SERVICE_PLACES: string[];
  const VOLTAGES_OPTIONS: string[];
}

export default config;
