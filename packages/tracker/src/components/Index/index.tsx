"use client";
import { useState } from "react";

import SearchBar from "@/components/Index/Search";

import styles from "./index.module.scss";
import ProductContainer from "./ProductContainer";

const Index = () => {
  const [id, setId] = useState("");
  const [enabled, setEnabled] = useState(false);

  const numberId = Number(id.replace(/\D/g, ""));

  return (
    <main className={styles.track}>
      <SearchBar setEnabled={setEnabled} setSearch={setId} />
      <ProductContainer enabled={enabled} productId={numberId} />
    </main>
  );
};

export default Index;
