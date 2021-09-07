import { useRef } from "react";

import styles from "./track.module.scss";

export default function Track() {
  const searchInputRef = useRef();

  const handleSearch = async (event) => {
    event.preventDefault();
    const search = searchInputRef.current?.value;

    const res = await fetch("?", {
      method: "???",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ search }),
    });

    const data = await res.json();
    data;
  };

  return (
    <article className={styles.track}>
      <h1>
        Verifique o status do seu <span>produto</span>
      </h1>
      <form onSubmit={handleSearch}>
        <label className={styles.search}>
          <input type="text" ref={searchInputRef}></input>
          <button type="submit">Pesquisar</button>
        </label>
      </form>
    </article>
  );
}
