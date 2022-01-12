import nodemailer from "nodemailer";

import apiFactory from "/src/utils/apiFactory";

const methods = {
  async POST(req, res) {
    try {
      let transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_USER,
        },
      });

      // send mail with defined transport object
      await transporter.sendMail({
        from: `"Makilab Serviços" <${process.env.EMAIL_USER}`,
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
          src="https://track.makilab.com.br/logo.png"
          alt="Logo da Makilab Serviços"
          style="width: 40vw"
        />

        <h1 style="margin: 0; padding: 8vw; text-align: center">Atualizações sobre o seu produto</h1>

        <div style="width: 100%; color: white; background-color: red">
          <p style="text-align: center; color: white; background-color: red; padding: 8vw; margin: 0">
            ${req.body.text}
          </p>
        </div>

        <a href="https://api.whatsapp.com/send?phone=5571985447786">
          <img
            src="https://track.makilab.com.br/whatsapp.png"
            alt="Whatsapp da Makilab Serviços"
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
    } catch (e) {
      res.statusCode = 400;
      res.end({ error: String(e) });
    }
  },
};

export default apiFactory(methods, true);
