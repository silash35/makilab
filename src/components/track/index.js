import { useRef, useState } from "react";

import Equipment from "./equipment";
import styles from "./track.module.scss";

export default function Track() {
  const [equipment, setEquipment] = useState(false);
  const searchInputRef = useRef();

  const handleSearch = async (event) => {
    event.preventDefault();
    const search = searchInputRef.current?.value;

    /*
    const res = await fetch("?", {
      method: "???",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ search }),
    });

    const data = await res.json();
    */

    setEquipment(search);
  };

  return (
    <article className={styles.track}>
      <h1>
        Verifique o status do seu <span>produto</span>
      </h1>
      <form onSubmit={handleSearch}>
        <label className={styles.search}>
          <input
            type="text"
            placeholder="Digite a Ordem de serviço. Ex. 190XXX"
            ref={searchInputRef}
          ></input>
          <button type="submit">Pesquisar</button>
        </label>
      </form>

      <Equipment equipment={equipment} />
    </article>
  );
}
