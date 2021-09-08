import Link from "next/link";

import styles from "./header.module.scss";

export default function Header() {
  return (
    <header className={styles.header}>
      <nav>
        <Link as="/" href="/">
          <a className={styles.image}>
            <img alt="Ícone do MakiLab; O desenho de uma Coruja" src="/text.png" height="40"></img>
          </a>
        </Link>

        <div>
          <Link as="/#services" href="/#services">
            <a className={styles.headerButton}>Serviços</a>
          </Link>
          <Link as="/#partners" href="/#partners">
            <a className={styles.headerButton}>Parceiros</a>
          </Link>
          <Link as="/#contact" href="/#contact">
            <a className={`${styles.headerButton} ${styles.contact}`}>Contato</a>
          </Link>
        </div>
      </nav>
    </header>
  );
}
