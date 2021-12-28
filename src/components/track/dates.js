import "dayjs/locale/pt-br";

import dayjs from "dayjs";

import styles from "./dates.module.scss";

dayjs.locale("pt-br");

export default function Dates({ product }) {
  const dates = [];

  if (product.createdAt != null) {
    dates.push(<DateItem text="Produto chegou na Makilab" date={product.createdAt} />);
  }
  if (product.avalietedAt != null) {
    dates.push(<DateItem text="Produto foi avaliado" date={product.avalietedAt} />);
  }
  if (product.budgetAnsweredAt != null) {
    dates.push(<DateItem text="Orçamento respondido" date={product.budgetAnsweredAt} />);
  }
  if (product.repairedAt != null) {
    dates.push(<DateItem text="Reparo concluído com sucesso" date={product.repairedAt} />);
  }
  if (product.deliveredToCustomerAt != null) {
    dates.push(
      <DateItem text="Produto foi entregue ao cliente" date={product.deliveredToCustomerAt} />
    );
  }

  return <ul className={styles.list}>{dates}</ul>;
}

function DateItem({ text, date }) {
  return (
    <li className={styles.item}>
      <p>{dayjs(date).format("dddd d MMMM, YYYY")}</p>

      <div className={styles.flex}>
        <p className={styles.time}>{dayjs(date).format("hh:mm A")}</p>
        <p className={styles.text}>{text}</p>
      </div>
    </li>
  );
}
