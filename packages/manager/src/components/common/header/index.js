import Link from "next/link";

import styles from "./header.module.scss";

export default function Header() {
  return (
    <header className={styles.header}>
      <nav>
        <Link href="/">
          <a className={styles.image}>
            <img alt="OpenSOM, with SOM written in green" src="/text.svg" height="40"></img>
          </a>
        </Link>

        <div>
          <Link href="/">
            <a className={styles.headerButton}>Home</a>
          </Link>
          <Link href="/help">
            <a className={styles.headerButton}>Help</a>
          </Link>
          <Link href="https://github.com/silash35/opensom">
            <a className={`${styles.headerButton} ${styles.contact}`}>GitHub</a>
          </Link>
        </div>
      </nav>
    </header>
  );
}
