import config from "@config";
import { Button } from "@mui/material";
import Paper from "@mui/material/Paper";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";

import ProcessedProduct from "@/types/processedProduct";
import processProduct from "@/utils/processProduct";

import Product from "../product";
import en from "./locales/en";
import pt from "./locales/pt";
import styles from "./track.module.scss";

type ProductState = "loading" | "empty" | "notFound" | ProcessedProduct;

export default function Track() {
  const router = useRouter();
  const t = router.locale === "en" ? en : pt;

  const [search, setSearch] = useState<string | undefined>();
  const [product, setProduct] = useState<ProductState>("empty");
  const [paperElevation, setPaperElevation] = useState(4);

  useEffect(() => {
    setSearch(Array.isArray(router.query.id) ? router.query.id[0] : router.query.id);
  }, [router.query.id]);

  const handleSearch = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setProduct("loading");
    if (!search) {
      setProduct("notFound");
      return;
    }

    let data;

    try {
      const res = await fetch(config.API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ search }),
      });

      if (res.status === 200) {
        data = await res.json();
      } else {
        data = "ERROR";
      }
    } catch (error) {
      data = "ERROR";
    }

    if (typeof data === "object" && data != null) {
      setProduct(processProduct(data, t));
    } else {
      setProduct("notFound");
    }
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