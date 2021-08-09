import Screen from "../screen";
import styles from "./contact.module.scss";
import Form from "./form";
import Links from "./links";

export default function Contact() {
  return (
    <Screen id="contact" background="dark">
      <h2 className={styles.title}>Entre em Contato</h2>

      <section className={styles.flex}>
        <Links />
        <Form />
      </section>
    </Screen>
  );
}
