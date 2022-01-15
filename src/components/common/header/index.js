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
          <Link as="https://makilab.com.br/" href="https://makilab.com.br/">
            <a className={styles.headerButton}>Home</a>
          </Link>
          <Link
            as="https://www.instagram.com/makilabservicos/"
            href="https://www.instagram.com/makilabservicos/"
          >
            <a className={styles.headerButton}>Instagram</a>
          </Link>
          <Link
            as="https://api.whatsapp.com/send?phone=5571985447786"
            href="https://api.whatsapp.com/send?phone=5571985447786"
          >
            <a className={`${styles.headerButton} ${styles.contact}`}>WhatsApp</a>
          </Link>
        </div>
      </nav>
    </header>
  );
}
