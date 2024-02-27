"use client";

import CircularProgress from "@mui/material/CircularProgress";

import ProductComponent from "@/components/Product";
import useLocale from "@/hooks/useLocale";
import useProduct from "@/hooks/useProduct";

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
  enabled: boolean;
}

function productContainer({ productId, enabled }: Props) {
  const { locale } = useLocale();
  const t = locale === "en" ? en : pt;

  const { product, status, error } = useProduct(productId, enabled);

  if (enabled !== true) {
    return null;
  }

  if (status === "pending") {
    return (
      <div className={styles.loading}>
        <CircularProgress />
      </div>
    );
  }

  if (status === "error") {
    if (error.status === 404) {
      return <p>{t.notFound}</p>;
    }
    return <p>{t.unknownError}</p>;
  }

  if (product === undefined) {
    return null;
  }

  return <ProductComponent product={product} />;
}

export default productContainer;
