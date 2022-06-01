import config from "@config";
import nodemailer from "nodemailer";
const { SITE_URL, COMPANY } = config;

class MailService {
  async sendMail(to: string, text: string) {
    const transporter = nodemailer.createTransport({
      host: import.meta.env.EMAIL_HOST,
      port: 587,
      secure: false,
      auth: {
        user: import.meta.env.EMAIL_USER,
        pass: import.meta.env.EMAIL_PASSWORD,
      },
    });

    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: `"${COMPANY.name}" <${import.meta.env.EMAIL_USER}>`,
      to: `${import.meta.env.EMAIL_USER}, ${to}`,
      subject: "Atualizações sobre o seu equipamento",
      text: text,
      html: `
      <div
        style="
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-family: sans-serif;
          font-size: 20px;
        "
        class="flex"
      >
      <img
        src="${SITE_URL}/YOUR_COMPANY_LOGO.svg"
        alt="Logo da ${COMPANY.name}"
        style="width: 40vw"
      />

      <h1 style="margin: 0; padding: 8vw; text-align: center">Atualizações sobre o seu produto</h1>

      <p
        style="
          text-align: center;
          color: white;
          background-color: ${COMPANY.color};
          padding: 8vw;
          margin: 0
        "
      >
          ${text}
      </p>

      <a href="tel:${COMPANY.whatsapp.replace(/[^0-9]/g, "")}">
        <img
          src="${SITE_URL}/whatsapp.png"
          alt="Whatsapp da ${COMPANY.name}"
          style="width: 30vw; margin: 8vw"
      /></a>

      <p style="text-align: center; color: gray; margin: 0">
        🤖 Essa mensagem foi enviada automaticamente por um serviço em fase de teste. Por isso o seu
        feedback é importante para nós. Qualquer problema reporte para o nosso WhatsApp.
      </p>
    </div>
    `,
    });

    return nodemailer.getTestMessageUrl(info);
  }
}

const mailService = new MailService();

export default mailService;
