import styles from "./contact.module.scss";
import Form from "./form";
import Links from "./links";

export default function Contact() {
  return (
    <article id="contact" className={styles.contact}>
      <section>
        <h2>Entre em Contato</h2>
      </section>
      <section className={styles.card}>
        <article>
          <Links />
        </article>
        <article>
          <Form />
        </article>
      </section>
    </article>
  );
}
