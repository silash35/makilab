import { Button } from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { useRef, useState } from "react";

import processProduct from "@/utils/processProduct";

import Product from "../product";
import styles from "./track.module.scss";

const Span = styled("span")(({ theme }) => ({
  color: theme.palette.primary.main,
}));

export default function Track() {
  const [product, setProduct] = useState(false);
  const [paperElevation, setPaperElevation] = useState(4);
  const searchInputRef = useRef();

  const handleSearch = async (event) => {
    event.preventDefault();
    setProduct("loading");

    const search = searchInputRef.current?.value;

    const res = await fetch(`/api/product/?id=${search}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    setProduct(processProduct(data));
  };

  return (
    <article className={styles.track}>
      <h1>
        Verifique o status do seu <Span>produto</Span>
      </h1>
      <form onSubmit={handleSearch}>
        <Paper
          className={styles.search}
          component="label"
          elevation={paperElevation}
          onMouseOver={() => setPaperElevation(8)}
          onMouseOut={() => setPaperElevation(4)}
        >
          <input type="text" placeholder="Digite a Ordem de serviço" ref={searchInputRef}></input>
          <Button type="submit" variant="contained">
            Pesquisar
          </Button>
        </Paper>
      </form>

      <Product product={product} />
    </article>
  );
}
