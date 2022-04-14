import config from "@config";
import QRCode from "easyqrcodejs";
import { useEffect, useRef } from "react";

const { PDF } = config;

export default function QrCode({ id }) {
  const qrcode = useRef(null);
  const qrCodeLink = PDF.qrCodeLink.replace("%ID%", id);

  useEffect(() => {
    qrcode.current.innerHTML = "";
    const options = {
      text: qrCodeLink,
      width: 150,
      height: 150,
    };
    new QRCode(qrcode.current, options);
  }, [id]);

  return <div ref={qrcode}></div>;
}
