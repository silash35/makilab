import styles from "./equipment.module.scss";

export default function Equipment({ equipment }) {
  if (equipment === false) {
    return null;
  }
  if (equipment === "") {
    return <p>Nenhum produto encontrado, você digitou a OS corretamente?</p>;
  }

  return (
    <section className={styles.equipment}>
      <p>Produto: {equipment}</p>
      <p>Status:</p>
      <p></p>
      <p></p>
    </section>
  );
}
