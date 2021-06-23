import styles from "./form.module.scss";

export default function Form() {
  return (
    <form className={styles.form} action="https://formsubmit.co/silash35@gmail.com" method="POST">
      <div>
        <div className={styles.textField}>
          <label htmlFor="name">Seu nome:</label>
          <input name="name" />
        </div>
        <div className={styles.textField}>
          <label htmlFor="mail">Seu Email:</label>
          <input type="mail" name="mail" />
        </div>
      </div>
      <div className={styles.textField}>
        <label htmlFor="message">Mensagem:</label>
        <textarea aria-label="Insira sua mensagem" name="message" />
      </div>

      <button type="submit">Enviar</button>
    </form>
  );
}
