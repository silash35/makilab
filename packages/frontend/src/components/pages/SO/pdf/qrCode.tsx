import config from "@config";
import QRCode from "easyqrcodejs";
import { useEffect, useRef } from "react";

const { PDF } = config;

interface Props {
  id: string;
}

export default function QrCode({ id }: Props) {
  const qrcode = useRef<HTMLDivElement>(null);
  const qrCodeLink = PDF.qrCodeLink.replace("%ID%", id);

  const options = {
    text: qrCodeLink,
    width: 150,
    height: 150,
    quietZone: 8,
  };

  useEffect(() => {
    if (qrcode.current) {
      // Clear the previous QR code
      qrcode.current.innerHTML = "";
      // Create a new QR code
      new QRCode(qrcode.current, options);
    }
  }, [id]);

  return <div ref={qrcode}></div>;
}
