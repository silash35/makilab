import Button from "@mui/material/Button";
import Link from "next/link";

import SendMailDialog from "@/components/common/SendMailDialog";
import useServiceOrder from "@/hooks/useServiceOrder";
import Budget from "@/types/budget";

import styles from "./options.module.scss";

interface Props {
  budget: Budget;
}

export default function Options({ budget }: Props) {
  const { serviceOrder } = useServiceOrder(String(budget.serviceOrderId));

  let MailButton;
  if (serviceOrder && serviceOrder.owner.email) {
    MailButton = (
      <SendMailDialog
        to={serviceOrder.owner.email}
        defaultText={`Prezado(a) ${serviceOrder.owner.name}, seu produto (${serviceOrder.equipment} ${serviceOrder.brand}) de OS ${serviceOrder.id} foi orçado. Confira o orçamento em anexo.`}
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
      <Button variant="contained" onClick={window.print}>
        Imprimir
      </Button>
      <Link href={`/admin/budget/${budget.id}`} passHref>
        <Button variant="outlined" component="a">
          Editar Orçamento
        </Button>
      </Link>
      {MailButton}
    </div>
  );
}
