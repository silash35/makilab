import config from "@config";
import Link from "next/link";

import useLocale from "@/hooks/useLocale";

import styles from "./header.module.scss";
import en from "./locales/en";
import pt from "./locales/pt";

const { COMPANY } = config;

const Header = () => {
  const { locale } = useLocale();
  const t = locale === "en" ? en : pt;

  return (
    <header className={styles.header}>
      <nav>
        <Link className={styles.image} href="/">
          <img alt={`${COMPANY.name} logo`} height="40" src="/YOUR_COMPANY_LOGO.svg" />
        </Link>

        <div>
          <Link className={styles.headerButton} href={`mailto:${COMPANY.email}`}>
            E-mail
          </Link>
          <Link
            className={styles.headerButton}
            href={`tel:${COMPANY.phones[0].replace(/[^0-9]/g, "")}`}
          >
            {t.phone}
          </Link>
          <Link
            className={`${styles.headerButton} ${styles.contact}`}
            href={`https://wa.me/${COMPANY.whatsapp.replace(/[^0-9]/g, "")}`}
          >
            WhatsApp
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
