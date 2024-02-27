import config from "@config";
import Alert from "@mui/material/Alert";

import useLocale from "@/hooks/useLocale";

import styles from "./footer.module.scss";
import en from "./locales/en";
import pt from "./locales/pt";

const Footer = () => {
  const { locale } = useLocale();
  const t = locale === "en" ? en : pt;

  return (
    <footer>
      <div className={styles.info}>
        <Alert severity="info" variant="filled">
          <p>
            {t.text1p1} <a href="https://github.com/silash35/opensom">OpenSOM</a> {t.text1p2}
          </p>
          <p>
            {t.text2p1} <a href={config.BACKEND_URL}>{t.text2p2}</a> {t.text2p3}
          </p>
        </Alert>
      </div>
    </footer>
  );
};

export default Footer;
