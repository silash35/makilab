import format from "date-fns/format";
import ptBR from "date-fns/locale/pt-BR";

import styles from "./dates.module.scss";

export default function Dates({ product }) {
  const dates = [];

  if (product.createdAt != null) {
    dates.push(<DateItem text="Produto chegou na Makilab" date={product.createdAt} key={1} />);
  }
  if (product.avalietedAt != null) {
    dates.push(<DateItem text="Produto foi avaliado" date={product.avalietedAt} key={2} />);
  }
  if (product.budgetAnsweredAt != null) {
    dates.push(<DateItem text="Orçamento respondido" date={product.budgetAnsweredAt} key={3} />);
  }
  if (product.repairedAt != null) {
    dates.push(<DateItem text="Reparo concluído com sucesso" date={product.repairedAt} key={4} />);
  }
  if (product.deliveredToCustomerAt != null) {
    dates.push(
      <DateItem
        text="Produto foi entregue ao cliente"
        date={product.deliveredToCustomerAt}
        key={5}
      />
    );
  }

  return <ul className={styles.list}>{dates}</ul>;
}

function DateItem({ text, date }) {
  return (
    <li className={styles.item}>
      <p className={styles.date}>
        {format(new Date(date), "EEEE, d ", { locale: ptBR })}
        <span>de</span>
        {format(new Date(date), " MMMM ", { locale: ptBR })}
        <span>de</span>
        {format(new Date(date), " yyyy", { locale: ptBR })}
      </p>

      <div className={styles.flex}>
        <p className={styles.time}>{format(new Date(date), "hh:mm a", { locale: ptBR })}</p>
        <p className={styles.text}>{text}</p>
      </div>
    </li>
  );
}
