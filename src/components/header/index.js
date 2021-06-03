import styles from "./header.module.scss";

export default function Header() {
  return (
    <header className={styles.header}>
      <nav>
        <a href="/index.html">
          <img alt="Ícone do MakiLab; Um desenho de uma Coruja" src="/icon.svg" width="80"></img>
        </a>

        <a className={styles.contactButton} href="#contact">
          Contato
        </a>
      </nav>
    </header>
  );
}
