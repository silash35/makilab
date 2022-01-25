import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import DeleteDialog from "@/components/common/deleteDialog";
import EditDialog from "@/components/common/editDialog";
import EquipmentInputs from "@/components/common/inputs/equipment";
import SendMailDialog from "@/components/common/sendMailDialog";

import UpdateStatusDialog from "../updateStatusDialog";
import styles from "./detailedInformation.module.scss";

export default function DetailedInformation({ equipment, reload }) {
  const owner = equipment.owner;

  return (
    <Box className={styles.detailedInformation}>
      <h2>Informações Detalhadas</h2>

      <Box className={styles.cardsContainer}>
        <Card variant="outlined">
          <CardContent>
            <h3>Sobre o Equipamento</h3>
            <p>{equipment.batchOrImei && `N° de Serie ou IMEI: ${equipment.batchOrImei}`}</p>
            <p>{equipment.productNumber && `Product Number: ${equipment.productNumber}`}</p>
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
          </CardContent>
        </Card>

        <Card variant="outlined">
          <CardContent>
            <h3>Sobre o Cliente</h3>
            <p>{owner.name && `Nome: ${owner.name}`}</p>
            <p>{owner.email && `Email: ${owner.email}`}</p>
            <p>{owner.address && `Endereço: ${owner.address}`}</p>
            <p>{owner.zip && `CEP: ${owner.zip}`}</p>
            <p>{owner.whatsapp && `WhatsApp: ${owner.whatsapp}`}</p>
            <p>{owner.tel && `Telefone: ${owner.tel}`}</p>
            <p>{owner.cpfOrCnpj && `CPF ou CNPJ: ${owner.cpfOrCnpj}`}</p>
          </CardContent>
        </Card>

        <Card variant="outlined">
          <CardContent>
            <h3>Sobre o Atendimento</h3>
            <p>{equipment.attendedBy && `Atendido Por: ${equipment.attendedBy}`}</p>
            <p>{equipment.attendedOn && `Local de Atendimento: ${equipment.attendedOn}`}</p>
            <p>{equipment.listOfServices && `Lista de serviços: ${equipment.listOfServices}`}</p>
          </CardContent>
        </Card>
      </Box>

      <div className={styles.flex}>
        <DeleteDialog
          id={equipment.id}
          URL={"/api/admin/equipments"}
          title={`Deletar ${equipment.id}`}
          text={`Tem certeza que deseja excluir a OS ${equipment.id}?`}
          reload={reload}
        />
        {owner.email && <SendMailDialog client={equipment.owner} />}
        <EditDialog
          Inputs={<EquipmentInputs equipment={equipment} />}
          URL={"/api/admin/equipments"}
          title="Editar Equipamento"
          reload={reload}
        />
        <UpdateStatusDialog equipment={equipment} reload={reload} />
      </div>
    </Box>
  );
}
