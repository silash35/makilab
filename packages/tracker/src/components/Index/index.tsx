import { useRouter } from "next/router";
import { useState } from "react";

import SearchBar from "@/components/Index/Search";
import getProduct, { Product as ProductType } from "@/utils/getProduct";

import styles from "./index.module.scss";
import Product from "./ProductContainer";

type ProductState = "loading" | "empty" | "Unknown error" | "Not found" | ProductType;

const Index = () => {
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
    <main className={styles.track}>
      <SearchBar load={load} />
      <Product product={product} />
    </main>
  );
};

export default Index;
