import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import DeleteDialog from "@/components/common/deleteDialog";
import EditDialog from "@/components/common/editDialog";
import EquipmentInputs from "@/components/common/inputs/equipment";
import SendMailDialog from "@/components/common/sendMailDialog";

import UpdateStatusDialog from "../updateStatusDialog";
import styles from "./detailedInformation.module.scss";

export default function DetailedInformation({ client, reload }) {
  return (
    <Box className={styles.detailedInformation}>
      <h2>Informações Detalhadas</h2>

      <h3>Sobre o Cliente</h3>
      <p>{client.name && `Nome: ${client.name}`}</p>
      <p>{client.email && `Email: ${client.email}`}</p>
      <p>{client.address && `Endereço: ${client.address}`}</p>
      <p>{client.zip && `CEP: ${client.zip}`}</p>
      <p>{client.whatsapp && `WhatsApp: ${client.whatsapp}`}</p>
      <p>{client.tel && `Telefone: ${client.tel}`}</p>
      <p>{client.cpfOrCnpj && `CPF ou CNPJ: ${client.cpfOrCnpj}`}</p>

      <Box className={styles.cardsContainer}>
        {/*
        <Card variant="outlined">
          <CardContent>
            <h3>Sobre o Equipamento</h3>
            <p>{equipment.batchOrImei && `Lote ou IMEI: ${equipment.batchOrImei}`}</p>
            <p>{equipment.equipment_number && `Numero de Serie: ${equipment.equipment_number}`}</p>
            <p>
              {equipment.isUnderWarranty
                ? "Equipamento em Garantia"
                : "Equipamento Fora de Garantia"}
            </p>
            <p>
              {(() => {
                if (equipment.isUnderWarranty === false) {
                  if (equipment.isBudgetApproved === null) {
                    return "Orçamento ainda não aprovado";
                  } else if (equipment.isBudgetApproved === false) {
                    return "Orçamento Negado";
                  } else if (equipment.isBudgetApproved === true) {
                    return "Orçamento Aprovado";
                  }
                }
              })()}
            </p>
            <p>{equipment.accessories && `Acessórios: ${equipment.accessories}`}</p>
            <p>
              {equipment.equipmentCondition &&
                `Condição do equipamento: ${equipment.equipmentCondition}`}
            </p>
            <p>
              {equipment.problemDescription &&
                `Descrição do problema: ${equipment.problemDescription}`}
            </p>
            {equipment.wasEdited && <Alert severity="info">Esse equipamento já foi editado</Alert>}
          </CardContent>
        </Card>
              */}
      </Box>

      <div className={styles.flex}>
        <DeleteDialog
          id={client.id}
          URL={"/api/admin/equipments"}
          name={`a OS ${client.id}`}
          reload={reload}
        />
        {client.email && <SendMailDialog client={client} />}
        <EditDialog
          Inputs={<EquipmentInputs equipment={client} />}
          URL={"/api/admin/equipments"}
          title="Editar Equipamento"
          reload={reload}
        />
        <UpdateStatusDialog equipment={client} reload={reload} />
      </div>
    </Box>
  );
}
