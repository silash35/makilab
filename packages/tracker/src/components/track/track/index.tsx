import { Button } from "@mui/material";
import Paper from "@mui/material/Paper";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";

import getProduct, { Product as ProductType } from "@/utils/getProduct";

import Product from "../product";
import en from "./locales/en";
import pt from "./locales/pt";
import styles from "./track.module.scss";

type ProductState = "loading" | "empty" | "Unknown error" | "Not found" | ProductType;

export default function Track() {
  const router = useRouter();
  const t = router.locale === "en" ? en : pt;

  const [search, setSearch] = useState<string>("");
  const [product, setProduct] = useState<ProductState>("empty");
  const [paperElevation, setPaperElevation] = useState(4);

  const load = async (s: string) => {
    setProduct("loading");
    if (!s) {
      setProduct("Not found");
      return;
    }

    const newProduct = await getProduct(s, t);
    setProduct(newProduct);
  };

  useEffect(() => {
    const id = Array.isArray(router.query.id) ? router.query.id[0] : router.query.id;
    if (id !== undefined) load(id);
  }, [router.query.id]);

  const handleSearch = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    load(search);
  };

  return (
    <article className={styles.track}>
      <h1>
        {t.title} <span>{t.titleSpan}</span>
      </h1>
      <form onSubmit={handleSearch}>
        <Paper
          className={styles.search}
          component="label"
          elevation={paperElevation}
          onMouseOver={() => setPaperElevation(8)}
          onMouseOut={() => setPaperElevation(4)}
        >
          <input
            type="text"
            placeholder={t.placeholder}
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          ></input>
          <Button type="submit" variant="contained">
            {t.button}
          </Button>
        </Paper>
      </form>

      <Product product={product} />
    </article>
  );
}
