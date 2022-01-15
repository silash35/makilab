import { useRef, useState } from "react";

import processProduct from "@/utils/processProduct";

import Product from "./product";
import styles from "./track.module.scss";

export default function Track() {
  const [product, setProduct] = useState(false);
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
        Verifique o status do seu <span>produto</span>
      </h1>
      <form onSubmit={handleSearch}>
        <label className={styles.search}>
          <input type="text" placeholder="Digite a Ordem de serviço" ref={searchInputRef}></input>
          <button type="submit">Pesquisar</button>
        </label>
      </form>

      <Product product={product} />
    </article>
  );
}
