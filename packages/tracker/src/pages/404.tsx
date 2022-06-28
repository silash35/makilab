import Stack from "@mui/material/Stack";
import { useRouter } from "next/router";

const en = {
  notFound: "Page Not Found",
};

const pt = {
  notFound: "Pagina não encontrada",
};

export default function Custom404() {
  const router = useRouter();
  const t = router.locale === "en" ? en : pt;

  return (
    <Stack margin="auto" justifyContent="center" alignItems="center">
      <h1>404 - {t.notFound}</h1>
    </Stack>
  );
}
