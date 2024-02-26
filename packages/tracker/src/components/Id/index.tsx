import Product from "@/components/common/Product";

import styles from "./id.module.scss";

const IdPage = ({ product }: Props) => {
  return (
    <article className={styles.container}>
      <Product product={product} />
    </article>
  );
};

export default IdPage;
