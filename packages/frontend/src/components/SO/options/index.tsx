import Button from "@mui/material/Button";
import { FormEvent } from "react";

import EditDialog from "@/components/common/editDialog";
import ClientInputs from "@/components/common/inputs/client";
import ServiceOrderInputs from "@/components/common/inputs/serviceOrder";
import SendMailDialog from "@/components/common/sendMailDialog";
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

  const handleEditSO = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData) as unknown as TServiceOrderInput;

    const { status } = await updateSO(serviceOrder.id, data);
    mutate();
    return status === 200;
  };

  const handleEditClient = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData) as unknown as TClientInput;

    const { status } = await updateClient(serviceOrder.owner.id, data);
    mutate();
    return status === 200;
  };

  return (
    <div className={styles.options}>
      <Button variant="contained" onClick={window.print}>
        Imprimir
      </Button>
      <EditDialog title="Editar OS" submit={handleEditSO}>
        <ServiceOrderInputs serviceOrder={serviceOrder} />
      </EditDialog>
      <EditDialog title="Editar Cliente" submit={handleEditClient}>
        <ClientInputs client={owner} />
      </EditDialog>
      {owner.email && (
        <SendMailDialog
          client={owner}
          email={`Prezado(a) ${owner.name}, seu produto (${serviceOrder.equipment} ${serviceOrder.brand}) de OS ${serviceOrder.id} foi recebido e está aguardando avaliação técnica.`}
        />
      )}
    </div>
  );
}
