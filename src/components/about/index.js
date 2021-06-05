import styles from "./about.module.scss";

export default function About() {
  return (
    <article id="about" className={styles.about}>
      <section>
        <h1>MakiLab Serviços</h1>
        <p></p>
      </section>
      <img alt="Ícone do MakiLab; O desenho de uma Coruja" src="/icon.svg" height="500"></img>
    </article>
  );
}
