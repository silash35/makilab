import Divider from "../divider";
import styles from "./contact.module.scss";
import Form from "./form";

export default function Contact() {
  return (
    <>
      <Divider top />

      <article id="contact" className={styles.contact}>
        <section>
          <h2>Entre em Contato</h2>
        </section>
        <section className={styles.card}>
          <article>
            <ul>
              <li>
                <img src="/resources/icons/email.svg" alt="email Icon" />
                <a href="mailto:contato@makilab.com.br" title="e-mail address">
                  contato@makilab.com.br
                </a>
              </li>
              <li>
                <img src="/resources/icons/whatsapp.svg" alt="Whatsapp Icon" />
                <a href="tel:+5571985447786" title="Phone number">
                  +55 71 98544-7786
                </a>
              </li>
              <li>
                <img src="/resources/icons/instagram.svg" alt="instagram Icon" />
                <a
                  href="https://www.instagram.com/makilabservicos/"
                  title="instagram"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @makilabservicos
                </a>
              </li>
            </ul>
          </article>
          <article>
            <Form />
          </article>
        </section>
      </article>
    </>
  );
}
