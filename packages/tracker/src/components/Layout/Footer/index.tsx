import config from "@config";
import Alert from "@mui/material/Alert";
import { useRouter } from "next/router";

import styles from "./footer.module.scss";
import en from "./locales/en";
import pt from "./locales/pt";

const Footer = () => {
  const router = useRouter();
  const t = router.locale === "en" ? en : pt;

  const url = new URL(config.API_URL);
  const link = url.origin;
  return (
    <footer>
      <div className={styles.info}>
        <Alert severity="info" variant="filled">
          <p>
            {t.text1p1} <a href="https://github.com/silash35/opensom">OpenSOM</a> {t.text1p2}
          </p>
          <p>
            {t.text2p1} <a href={link}>{t.text2p2}</a> {t.text2p3}
          </p>
        </Alert>
      </div>
    </footer>
  );
};

export default Footer;
