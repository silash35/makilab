import config from "@config";
import Link from "next/link";
import { useRouter } from "next/router";

import styles from "./header.module.scss";
import en from "./locales/en";
import pt from "./locales/pt";
const { COMPANY } = config;

export default function Header() {
  const router = useRouter();
  const { locale } = router;
  const t = locale === "en" ? en : pt;
  return (
    <header className={styles.header}>
      <nav>
        <Link href="/">
          <a className={styles.image}>
            <img alt={`${COMPANY.name} logo`} src="/YOUR_COMPANY_LOGO.svg" height="40" />
          </a>
        </Link>

        <div>
          <Link href={`mailto:${COMPANY.email}`}>
            <a className={styles.headerButton}>E-mail</a>
          </Link>
          <Link href={`tel:${COMPANY.phone.replace(/[^0-9]/g, "")}`}>
            <a className={styles.headerButton}>{t.phone}</a>
          </Link>
          <Link href={`https://wa.me/${COMPANY.whatsapp.replace(/[^0-9]/g, "")}`}>
            <a className={`${styles.headerButton} ${styles.contact}`}>WhatsApp</a>
          </Link>
        </div>
      </nav>
    </header>
  );
}
