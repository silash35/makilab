import { Button } from "@mui/material";
import Paper from "@mui/material/Paper";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

import processProduct from "@/utils/processProduct";
import request from "@/utils/request";

import Product from "../product";
import styles from "./track.module.scss";

export default function Track() {
  const [product, setProduct] = useState(false);
  const [paperElevation, setPaperElevation] = useState(4);
  const searchInputRef = useRef();

  const router = useRouter();
  const { id } = router.query;

  const load = async (id) => {
    const data = await request(`/api/product/?id=${id}`, "GET", undefined, true);

    if (data != "ERROR") {
      setProduct(processProduct(data));
    } else {
      setProduct({});
    }
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    setProduct("loading");
    load(searchInputRef.current?.value);
  };

  useEffect(() => {
    if (id != undefined) {
      load(id);
    }
  }, [id]);

  return (
    <article className={styles.track}>
      <h1>
        Verifique o status do seu <span>produto</span>
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