import CircularProgress from "@mui/material/CircularProgress";
import { useRouter } from "next/router";

import ProductComponent from "@/components/common/Product";
import type { Product } from "@/utils/getProduct";

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
  product: "loading" | "empty" | "Unknown error" | "Not found" | Product;
}

function productContainer({ product }: Props) {
  const router = useRouter();
  const t = router.locale === "en" ? en : pt;

  if (product === "loading") {
    return (
      <div className={styles.loading}>
        <CircularProgress />
      </div>
    );
  }

  if (product === "empty") {
    return null;
  }

  if (product === "Unknown error") {
    return <p>{t.unknownError}</p>;
  }

  if (product === "Not found") {
    return <p>{t.notFound}</p>;
  }

  return <ProductComponent product={product} />;
}

export default productContainer;
