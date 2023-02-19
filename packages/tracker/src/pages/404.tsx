import Stack from "@mui/material/Stack";
import { useRouter } from "next/router";

const en = {
  notFound: "Page Not Found",
};

const pt = {
  notFound: "Pagina não encontrada",
};

const Custom404 = () => {
  const router = useRouter();
  const t = router.locale === "en" ? en : pt;

  return (
    <Stack alignItems="center" justifyContent="center" margin="auto">
      <h1>404 - {t.notFound}</h1>
    </Stack>
  );
};

export default Custom404;
