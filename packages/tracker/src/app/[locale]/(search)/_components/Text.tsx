"use client";

import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

import useLocale from "@/hooks/useLocale";

import en from "./locales/en";
import pt from "./locales/pt";

const Span = styled("span")(({ theme }) => ({
  color: theme.palette.primary.main,
}));

const Text = () => {
  const { t } = useLocale({ en, pt });

  return (
    <Typography
      sx={{
        fontSize: {
          xs: "1.8rem",
          md: "2rem",
          lg: "3rem",
        },

        padding: {
          xs: 0,
          md: 1,
          lg: 2,
        },
      }}
      fontWeight="bold"
      textAlign="center"
      variant="h1"
    >
      {t.title} <Span>{t.titleSpan}</Span>
    </Typography>
  );
};

export default Text;
