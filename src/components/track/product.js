import styles from "./product.module.scss";

export default function Product({ product }) {
  if (product === false) {
    return null;
  }

  console.log(product);

  if (!product.name) {
    return <p>Nenhum produto encontrado, você digitou a OS corretamente?</p>;
  }

  return (
    <section className={styles.product}>
      <p>Produto: {product.name}</p>
      <p>Status: {product.status}</p>
    </section>
  );
}
