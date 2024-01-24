import config from "@config";
import { format } from "date-fns/format";

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

const Document = ({ budget }: Props) => {
  const { serviceOrder } = useServiceOrder(String(budget.serviceOrderId));

  return (
    <Page>
      <Header title={`Orçamento da OS ${budget.serviceOrderId}`} />
      <section className={styles.info}>
        <h3>{serviceOrder?.owner.name}</h3>
        <p>
          {serviceOrder?.equipment} {serviceOrder?.brand} {serviceOrder?.model}{" "}
          {serviceOrder?.batchOrImei} {serviceOrder?.productNumber}
        </p>
      </section>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Valor</th>
            <th>Quantidade</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {budget.itens.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{centsToBRL(item.price)}</td>
              <td>{item.quantity}</td>
              <td>{centsToBRL(item.price * item.quantity)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td>Total</td>
            <td colSpan={3}>{centsToBRL(budget.total)}</td>
          </tr>
        </tfoot>
      </table>

      <section className={styles.end}>
        <p>
          {COMPANY.city}, {format(new Date(), "dd/MM/yyyy")}
        </p>
      </section>
    </Page>
  );
};

export default Document;
