"use client";

import Stack from "@mui/material/Stack";

import useLocale from "@/hooks/useLocale";

const en = {
  notFound: "Page Not Found",
};

const pt = {
  notFound: "Página não encontrada",
};

const NotFound = () => {
  const { t } = useLocale({ en, pt });

  return (
    <Stack component="main" margin="auto">
      <h1>404 - {t.notFound}</h1>;
    </Stack>
  );
};

export default NotFound;
