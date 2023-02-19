import Button from "@mui/material/Button";
import Link from "next/link";

import { FormDialogButton } from "@/components/common/dialogs/FormDialog";
import ClientInputs from "@/components/common/inputs/Client";
import ServiceOrderInputs from "@/components/common/inputs/ServiceOrder";
import SendMailDialog from "@/components/common/SendMailDialog";
import { TClientInput } from "@/types/client";
import { TServiceOrderInput } from "@/types/serviceOrder";
import { TServiceOrderWithClient as ServiceOrder } from "@/types/serviceOrder";
import updateClient from "@/utils/mutations/updateClient";
import updateSO from "@/utils/mutations/updateSO";

import styles from "./options.module.scss";

interface Props {
  serviceOrder: ServiceOrder;
  mutate: () => Promise<void>;
}

export default function Options({ serviceOrder, mutate }: Props) {
  const owner = serviceOrder.owner;

  const editSO = async (data: unknown) => {
    const { error } = await updateSO(serviceOrder.id, data as TServiceOrderInput);
    mutate();
    return error;
  };

  const editClient = async (data: unknown) => {
    const { error } = await updateClient(serviceOrder.owner.id, data as TClientInput);
    mutate();
    return error;
  };

  return (
    <div className={styles.options}>
      <Button variant="contained" onClick={window.print}>
        Imprimir
      </Button>
      <Button variant="outlined" href={`/admin/SO/${serviceOrder.id}/budgets`} component={Link}>
        Orçamentos
      </Button>
      <FormDialogButton
        buttonText="Editar Equipamento"
        formDialogProps={{
          title: "Editar Equipamento",
          children: <ServiceOrderInputs serviceOrder={serviceOrder} />,
          yesButtonText: "Confirmar",
          showLoading: true,
          submit: editSO,
        }}
      />
      <FormDialogButton
        buttonText="Editar Cliente"
        formDialogProps={{
          title: "Editar Cliente",
          children: <ClientInputs client={owner} />,
          yesButtonText: "Confirmar",
          showLoading: true,
          submit: editClient,
        }}
      />

      {owner.email && (
        <SendMailDialog
          to={owner.email}
          defaultText={`Prezado(a) ${owner.name}, seu produto (${serviceOrder.equipment} ${serviceOrder.brand}) de OS ${serviceOrder.id} foi recebido e está aguardando avaliação técnica.`}
        />
      )}
    </div>
  );
}
