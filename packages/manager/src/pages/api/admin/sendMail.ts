import config from "@config";
import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

import apiFactory from "@/utils/backend/apiFactory";

const { SITE_URL, COMPANY } = config;

const methods = {
  async POST(req: NextApiRequest, res: NextApiResponse) {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // send mail with defined transport object
    await transporter.sendMail({
      from: `"${COMPANY.name}" <${process.env.EMAIL_USER}>`,
      to: `${process.env.EMAIL_USER}, ${req.body.to}`,
      subject: "Atualizações sobre o seu equipamento",
      text: req.body.text,
      html: `<div
        style="
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-family: sans-serif;
        "
        class="flex"
      >
        <img
          src="${SITE_URL}/YOUR_COMPANY_LOGO.svg"
          alt="Logo da ${COMPANY.name}"
          style="width: 40vw"
        />

        <h1 style="margin: 0; padding: 8vw; text-align: center">Atualizações sobre o seu produto</h1>

        <div style="width: 100%; color: white; background-color: red">
          <p style="text-align: center; color: white; background-color: red; padding: 8vw; margin: 0">
            ${req.body.text}
          </p>
        </div>

        <a href="https://wa.me/${COMPANY.whatsapp.replace(/[^0-9]/g, "")}">
          <img
            src="${SITE_URL}/resources/whatsapp.png"
            alt="Whatsapp da ${COMPANY.name}"
            style="width: 30vw; margin: 8vw"
        /></a>

        <p style="text-align: center; color: gray; margin: 0">
          🤖 Essa mensagem foi enviada automaticamente por um serviço em fase de teste. Por isso o seu
          feedback é importante para nós. Qualquer problema reporte para o nosso WhatsApp.
        </p>
      </div>`,
    });

    res.statusCode = 200;
    res.end("ok");
  },
};

export default apiFactory(methods, true);
