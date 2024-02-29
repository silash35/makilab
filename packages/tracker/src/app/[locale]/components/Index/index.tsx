"use client";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useState } from "react";

import useLocale from "@/hooks/useLocale";

import en from "./locales/en";
import pt from "./locales/pt";
import ProductContainer from "./ProductContainer";
import SearchBar from "./Search";

const Span = styled("span")(({ theme }) => ({
  color: theme.palette.primary.main,
}));

const Index = () => {
  const [id, setId] = useState("");
  const [enabled, setEnabled] = useState(false);

  const { locale } = useLocale();
  const t = locale === "en" ? en : pt;

  const numberId = Number(id.replace(/\D/g, ""));

  return (
    <Stack alignItems="center" component="main" direction="column" margin={4} marginBottom="auto">
      <Typography
        sx={{
          fontSize: {
            xs: "1.8rem",
            md: "2rem",
            lg: "3rem",
          },
          marginBottom: 4,
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
      <SearchBar setEnabled={setEnabled} setSearch={setId} />
      {enabled && <ProductContainer productId={numberId} />}
    </Stack>
  );
};

export default Index;
