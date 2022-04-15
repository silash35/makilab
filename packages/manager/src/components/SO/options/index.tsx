import Button from "@mui/material/Button";

import EditDialog from "@/components/common/editDialog";
import ClientInputs from "@/components/common/inputs/client";
import ServiceOrderInputs from "@/components/common/inputs/serviceOrder";
import SendMailDialog from "@/components/common/sendMailDialog";
import { ProcessedSO } from "@/types/serviceOrder";

import styles from "./options.module.scss";

interface Props {
  serviceOrder: ProcessedSO;
  setIsPrinting: (isPrinting: boolean) => void;
}

export default function Options({ serviceOrder, setIsPrinting }: Props) {
  const owner = serviceOrder.owner;
  if (!owner) throw new Error("Owner not found");

  const print = () => {
    setIsPrinting(true);

    setTimeout(() => {
      window.print();
      setIsPrinting(false);
    }, 100);
  };

  return (
    <div className={styles.options}>
      <Button variant="contained" onClick={print}>
        Imprimir PDF
      </Button>
      <EditDialog
        Inputs={<ServiceOrderInputs serviceOrder={serviceOrder} />}
        url={"/api/admin/equipments"}
        title="Editar Equipamento"
        reload={reload}
      />
      <EditDialog
        Inputs={<ClientInputs client={owner} />}
        url={"/api/admin/clients"}
        title="Editar Cliente"
        reload={reload}
      />
      {owner.email && (
        <SendMailDialog
          client={owner}
          email={`Prezado(a) ${owner.name}, seu produto (${serviceOrder.equipment} ${serviceOrder.brand}) de OS ${serviceOrder.id} foi recebido e está aguardando avaliação técnica.`}
        />
      )}
    </div>
  );
}
