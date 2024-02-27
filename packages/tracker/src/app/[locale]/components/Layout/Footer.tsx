import config from "@config";
import { Link } from "@mui/material";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

import useLocale from "@/hooks/useLocale";

import en from "./locales/en";
import pt from "./locales/pt";

const P = styled("p")({ marginTop: 0, fontWeight: "normal" });

const Footer = () => {
  const { locale } = useLocale();
  const t = locale === "en" ? en : pt;

  return (
    <Box component="footer" padding={4}>
      <Alert severity="info" variant="filled">
        <P>
          {t.footer1p1}{" "}
          <Link color="inherit" href="https://github.com/silash35/opensom">
            OpenSOM
          </Link>{" "}
          {t.footer1p2}
        </P>
        <P>
          {t.footer2p1}{" "}
          <Link color="inherit" href={config.BACKEND_URL}>
            {t.footer2p2}
          </Link>{" "}
          {t.footer2p3}
        </P>
      </Alert>
    </Box>
  );
};

export default Footer;
