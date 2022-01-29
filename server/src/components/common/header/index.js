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
      </nav>
    </header>
  );
}
