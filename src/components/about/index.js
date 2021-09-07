import Link from "next/link";

import Screen from "../screen";
import styles from "./about.module.scss";

export default function About() {
  return (
    <Screen id="about" otherStyles={styles.about}>
      <section>
        <h1>MakiLab Serviços</h1>
        <p>
          conjunto das palavras escritas, em livro, folheto, documento etc. ( a comentários,
          aditamentos, sumário etc.); redação original de qualquer obra escrita.conjunto das
          palavras escritas, em livro, folheto, documento etc. ( a comentários, aditamentos, sumário
          etc.); redação original de qualquer obra escrita.conjunto das palavras escritas, em livro,
          folheto, documento etc. ( a comentários, aditamentos, sumário etc.); redação original de
          qualquer obra escrita.
        </p>
        <Link as="/track" href="/track">
          <a className={styles.button}>Acompanhe seu reparo</a>
        </Link>
      </section>
      <img alt="Ícone do MakiLab; O desenho de uma Coruja" src="/icon.svg" width="500"></img>
    </Screen>
  );
}
