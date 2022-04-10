import config from "@config";
import Alert from "@mui/material/Alert";
import styles from "./info.module.scss";
import { useRouter } from "next/router";
import pt from "./locales/pt";
import en from "./locales/en";

export default function Info() {
  const router = useRouter();
  const { locale } = router;
  const t = locale === "en" ? en : pt;

  const url = new URL(config.API_URL);
  const link = url.origin;
  return (
    <div className={styles.info}>
      <Alert variant="filled" severity="info">
        <p>
          {t.text1p1} <a href="https://github.com/silash35/opensom">OpenSOM</a> {t.text1p2}
        </p>
        <p>
          {t.text2p1} <a href={link}>{t.text2p2}</a> {t.text2p3}
        </p>
      </Alert>
    </div>
  );
}