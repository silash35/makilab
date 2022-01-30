import Button from "@mui/material/Button";

import EditDialog from "@/components/common/editDialog";
import ClientInputs from "@/components/common/inputs/client";
import EquipmentInputs from "@/components/common/inputs/equipment";
import SendMailDialog from "@/components/common/sendMailDialog";

import styles from "./options.module.scss";

export default function Options({ equipment, setIsPrinting, reload }) {
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
        Inputs={<EquipmentInputs equipment={equipment} />}
        URL={"/api/equipments"}
        title="Editar Equipamento"
        reload={reload}
      />
      <EditDialog
        Inputs={<ClientInputs client={equipment.owner} />}
        URL={"/api/clients"}
        title="Editar Cliente"
        reload={reload}
      />
      {equipment.owner.email && (
        <SendMailDialog
          client={equipment.owner}
          email={`Prezado(a) ${equipment.owner.name}, seu produto (${equipment.name} ${equipment.brand}) de OS ${equipment.id} foi recebido e está aguardando avaliação técnica.`}
        />
      )}
    </div>
  );
}
