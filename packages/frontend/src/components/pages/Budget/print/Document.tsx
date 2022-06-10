import config from "@config";

import Header from "@/components/common/pdf/Header";
import Page from "@/components/common/pdf/Page";
import useServiceOrder from "@/hooks/useServiceOrder";
import Budget from "@/types/budget";
import centsToBRL from "@/utils/centsToBRL";

import styles from "./document.module.scss";

const { COMPANY } = config;

interface Props {
  budget: Budget;
}

export default function Document({ budget }: Props) {
  const { serviceOrder } = useServiceOrder(String(budget.serviceOrderId));

  return (
    <Page>
      <Header title={`Orçamento da OS ${budget.serviceOrderId}`} />
      <section className={styles.info}>
        <p>Empresa: {COMPANY.name}</p>
        <p>Cliente: {serviceOrder?.owner.name}</p>
        <p>Equipamento: {serviceOrder?.equipment}</p>
      </section>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Quantidade</th>
            <th>Descrição</th>
            <th>Valor Unitário</th>
            <th>Valor Total</th>
          </tr>
        </thead>
        <tbody>
          {budget.itens.map((item) => (
            <tr key={item.id}>
              <td>{item.quantity}</td>
              <td>{item.name}</td>
              <td>{centsToBRL(item.price)}</td>
              <td>{centsToBRL(item.price * item.quantity)}</td>
            </tr>
          ))}

          <tr>
            <td colSpan={3}>Total</td>
            <td>{centsToBRL(budget.total)}</td>
          </tr>
        </tbody>
      </table>
    </Page>
  );
}
