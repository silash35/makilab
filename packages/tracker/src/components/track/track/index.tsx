import { useRouter } from "next/router";
import { useState } from "react";

import SearchBar from "@/components/track/search";
import getProduct, { Product as ProductType } from "@/utils/getProduct";

import Product from "../productContainer";
import styles from "./track.module.scss";

type ProductState = "loading" | "empty" | "Unknown error" | "Not found" | ProductType;

export default function Track() {
  const router = useRouter();
  const [product, setProduct] = useState<ProductState>("empty");

  const load = async (s: string) => {
    setProduct("loading");
    if (!s) {
      setProduct("Not found");
      return;
    }

    const newProduct = await getProduct(s, router.locale);
    setProduct(newProduct);
  };

  return (
    <article className={styles.track}>
      <SearchBar load={load} />
      <Product product={product} />
    </article>
  );
}
