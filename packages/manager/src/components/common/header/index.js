import Link from "next/link";

import styles from "./header.module.scss";

export default function Header() {
  return (
    <header className={styles.header}>
      <nav>
        <Link href="/">
          <a className={styles.image}>
            <img alt="Ícone do MakiLab; O desenho de uma Coruja" src="/text.png" height="40"></img>
          </a>
        </Link>

        <div>
          <Link href="https://makilab.com.br/">
            <a className={styles.headerButton}>Home</a>
          </Link>
          <Link href="https://www.instagram.com/makilabservicos/">
            <a className={styles.headerButton}>Instagram</a>
          </Link>
          <Link href="https://api.whatsapp.com/send?phone=5571985447786">
            <a className={`${styles.headerButton} ${styles.contact}`}>WhatsApp</a>
          </Link>
        </div>
      </nav>
    </header>
  );
}
