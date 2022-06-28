import Product from "@/components/common/Product";
import type { Product as TProduct } from "@/utils/getProduct";

import styles from "./id.module.scss";

interface Props {
  product: TProduct;
}

export default function IdPage({ product }: Props) {
  return (
    <article className={styles.container}>
      <Product product={product} />
    </article>
  );
}
