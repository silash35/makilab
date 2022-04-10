import config from "@config";
import { Button } from "@mui/material";
import Paper from "@mui/material/Paper";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useRef, useState } from "react";

import ProcessedProduct from "@/types/processedProduct";
import processProduct from "@/utils/processProduct";
import request from "@/utils/request";

import Product from "./product";
import styles from "./track.module.scss";

type ProductState = "loading" | "empty" | "notFound" | ProcessedProduct;

export default function Track() {
  const [product, setProduct] = useState<ProductState>("empty");
  const [paperElevation, setPaperElevation] = useState(4);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();
  const { id } = router.query;

  const load = async (id?: string | null) => {
    if (!id) {
      setProduct("notFound");
      return;
    }
    const data = await request(config.API_URL, "POST", { search: id }, true);

    if (data === "ERROR") {
      setProduct("notFound");
    } else {
      setProduct(processProduct(data));
    }
  };

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setProduct("loading");
    load(searchInputRef.current?.value);
  };

  useEffect(() => {
    if (id != undefined) {
      load(Array.isArray(id) ? id[0] : id);
    }
  }, [id]);

  return (
    <article className={styles.track}>
      <h1>
        Check your product <span>status</span>
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
            placeholder="Digite a Ordem de serviço"
            ref={searchInputRef}
            defaultValue={id}
          ></input>
          <Button type="submit" variant="contained">
            Pesquisar
          </Button>
        </Paper>
      </form>

      <Product product={product} />
    </article>
  );
}
