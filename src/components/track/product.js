import styles from "./product.module.scss";

export default function Product({ product }) {
  if (product === false) {
    return null;
  }
  if (product === "") {
    return <p>Nenhum produto encontrado, você digitou a OS corretamente?</p>;
  }

  return (
    <section className={styles.product}>
      <p>Produto: {product}</p>
      <p>Status:</p>
      <p></p>
      <p></p>
    </section>
  );
}
