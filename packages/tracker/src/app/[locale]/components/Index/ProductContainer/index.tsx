"use client";

import CircularProgress from "@mui/material/CircularProgress";
import { Suspense } from "react";

import ProductFetcher from "@/components/ProductFetcher";
import useLocale from "@/hooks/useLocale";

import styles from "./product.module.scss";

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

function productContainer({ productId }: Props) {
  const { locale } = useLocale();
  const t = locale === "en" ? en : pt;

  return (
    <Suspense
      fallback={
        <div className={styles.loading}>
          <CircularProgress />
        </div>
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
}

export default productContainer;
