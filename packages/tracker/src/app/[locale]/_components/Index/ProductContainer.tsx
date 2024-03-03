"use client";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { Suspense } from "react";

import ProductFetcher from "@/components/ProductFetcher";
import useLocale from "@/hooks/useLocale";

const en = {
  notFound: "No products found, did you type the Service Order correctly?",
  unknownError: "Unknown error, please try again later",
};

const pt = {
  notFound: "Nenhum produto encontrado, você digitou a OS corretamente?",
  unknownError: "Erro desconhecido, tente novamente mais tarde",
};

interface Props {
  productId: number;
}

const ProductContainer = ({ productId }: Props) => {
  const { t, locale } = useLocale({ en, pt });

  return (
    <Suspense
      fallback={
        <Box margin={8}>
          <CircularProgress />
        </Box>
      }
    >
      <ProductFetcher
        fallback={{
          notFound: <p>{t.notFound}</p>,
          default: <p>{t.unknownError}</p>,
        }}
        id={productId}
        locale={locale}
      />
    </Suspense>
  );
};

export default ProductContainer;
