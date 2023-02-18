import config from "@config";
import Link from "next/link";
import { useRouter } from "next/router";

import styles from "./header.module.scss";
import en from "./locales/en";
import pt from "./locales/pt";
const { COMPANY } = config;

export default function Header() {
  const router = useRouter();
  const t = router.locale === "en" ? en : pt;

  return (
    <header className={styles.header}>
      <nav>
        <Link href="/" className={styles.image}>
          <img alt={`${COMPANY.name} logo`} src="/YOUR_COMPANY_LOGO.svg" height="40" />
        </Link>

        <div>
          <Link href={`mailto:${COMPANY.email}`} className={styles.headerButton}>
            E-mail
          </Link>
          <Link
            href={`tel:${COMPANY.phones[0].replace(/[^0-9]/g, "")}`}
            className={styles.headerButton}
          >
            {t.phone}
          </Link>
          <Link
            href={`https://wa.me/${COMPANY.whatsapp.replace(/[^0-9]/g, "")}`}
            className={`${styles.headerButton} ${styles.contact}`}
          >
            WhatsApp
          </Link>
        </div>
      </nav>
    </header>
  );
}
