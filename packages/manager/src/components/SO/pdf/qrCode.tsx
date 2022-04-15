import config from "@config";
import QRCode from "easyqrcodejs";
import { useEffect, useRef } from "react";

const { PDF } = config;

interface Props {
  id: string;
}

export default function QrCode({ id }: Props) {
  const qrcode = useRef(null);
  const qrCodeLink = PDF.qrCodeLink.replace("%ID%", id);

  useEffect(() => {
    const options = {
      text: qrCodeLink,
      width: 150,
      height: 150,
    };
    new QRCode(qrcode.current, options);
  }, [id]);

  return <div ref={qrcode}></div>;
}
