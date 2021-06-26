import styles from "./form.module.scss";

export default function Form() {
  return (
    <article>
      <form className={styles.form} action="https://formsubmit.co/silash35@gmail.com" method="POST">
        <div>
          <div className={styles.textField}>
            <label htmlFor="name">Seu nome:</label>
            <input name="name" required />
          </div>
          <div className={styles.textField}>
            <label htmlFor="mail">Seu Email:</label>
            <input type="email" name="mail" required />
          </div>
        </div>
        <div className={styles.textField}>
          <label htmlFor="message">Mensagem:</label>
          <textarea aria-label="Insira sua mensagem" name="message" />
        </div>

        <button type="submit" className={styles.send}>
          <img src="/resources/icons/send.svg" alt="paper plane icon" />
          Enviar
        </button>
      </form>
    </article>
  );
}
