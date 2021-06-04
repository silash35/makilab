import styles from "./header.module.scss";

export default function Header() {
  return (
    <header className={styles.header}>
      <nav>
        <a href="/" className={styles.image}>
          <img alt="Ícone do MakiLab; Um desenho de uma Coruja" src="/text.png" height="40"></img>
        </a>

        <div>
          <a className={styles.headerButton} href="#contact">
            Serviços
          </a>
          <a className={styles.headerButton} href="#partners">
            Parceiros
          </a>
          <a className={`${styles.headerButton} ${styles.contact}`} href="#contact">
            Contato
          </a>
        </div>
      </nav>
    </header>
  );
}
