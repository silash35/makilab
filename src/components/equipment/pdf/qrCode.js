import QRCode from "easyqrcodejs";
import { useEffect, useRef } from "react";

export default function QrCode({ id }) {
  const qrcode = useRef(null);

  useEffect(() => {
    qrcode.current.innerHTML = "";
    const options = {
      text: `https://track.makilab.com.br?id=${id}`,
      width: 150,
      height: 150,
      quietZone: 8,
      logo: "/text2.png",
      logoBackgroundTransparent: true,
      logoWidth: 180,
    };
    new QRCode(qrcode.current, options);
  }, [id]);

  return <div ref={qrcode}></div>;
}
