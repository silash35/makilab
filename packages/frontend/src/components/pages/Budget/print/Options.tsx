import Button from "@mui/material/Button";
import Link from "next/link";

import SendMailDialog from "@/components/common/SendMailDialog";
import useServiceOrder from "@/hooks/useServiceOrder";
import Budget from "@/types/budget";

import styles from "./options.module.scss";

interface Props {
  budget: Budget;
}

const Options = ({ budget }: Props) => {
  const { serviceOrder } = useServiceOrder(String(budget.serviceOrderId));

  let MailButton;
  if (serviceOrder && serviceOrder.owner.email) {
    MailButton = (
      <SendMailDialog
        defaultText={`Prezado(a) ${serviceOrder.owner.name}, seu produto (${serviceOrder.equipment} ${serviceOrder.brand}) de OS ${serviceOrder.id} foi orçado. Confira o orçamento em anexo.`}
        to={serviceOrder.owner.email}
      />
    );
  } else {
    MailButton = (
      <Button variant="outlined" disabled>
        Enviar Email
      </Button>
    );
  }

  return (
    <div className={styles.options}>
      <Button onClick={window.print} variant="contained">
        Imprimir
      </Button>
      <Button component={Link} href={`/admin/budget/${budget.id}`} variant="outlined">
        Editar Orçamento
      </Button>
      {MailButton}
    </div>
  );
};

export default Options;
