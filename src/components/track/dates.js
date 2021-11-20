import styles from "./dates.module.scss";

export default function Dates({ product }) {
  const dates = [];

  if (product.createdAt != null) {
    dates.push([<li key={1}>Data da entrada do produto: {dateToText(product.createdAt)}</li>]);
  }
  if (product.avalietedAt != null) {
    dates.push([<li key={2}>Data da avaliação do produto: {dateToText(product.avalietedAt)}</li>]);
  }
  if (product.budgetApprovedAt != null) {
    dates.push([
      <li key={3}>Data da aprovação do Orçamento: {dateToText(product.budgetApprovedAt)}</li>,
    ]);
  }
  if (product.repairedAt != null) {
    dates.push([<li key={4}>Data da conclusão do reparo: {dateToText(product.repairedAt)}</li>]);
  }
  if (product.deliveredToCustomerAt != null) {
    dates.push([
      <li key={5}>Data da retirada pelo Cliente: {dateToText(product.deliveredToCustomerAt)}</li>,
    ]);
  }

  return <ul className={styles.list}>{dates}</ul>;
}

const dateToText = (date) => {
  date = date.substring(0, date.indexOf("T"));
  return date.replace(/-/gi, "/");
};
