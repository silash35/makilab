import styles from "./about.module.scss";

export default function About() {
  return (
    <article id="about" className={styles.about}>
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
      </section>
      <img alt="Ícone do MakiLab; O desenho de uma Coruja" src="/icon.svg" height="500"></img>
    </article>
  );
}
