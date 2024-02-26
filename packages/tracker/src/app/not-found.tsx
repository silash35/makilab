"use client";

import Stack from "@mui/material/Stack";

import useLocale from "@/hooks/useLocale";

import Layout from "./[locale]/layout";

const en = {
  notFound: "Page Not Found",
};

const pt = {
  notFound: "Pagina não encontrada",
};

const NotFound = () => {
  const { locale } = useLocale();
  const t = locale === "en" ? en : pt;

  return (
    <Layout>
      <Stack alignItems="center" justifyContent="center" margin="auto">
        <h1>404 - {t.notFound}</h1>
      </Stack>
    </Layout>
  );
};

export default NotFound;
