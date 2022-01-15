import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import EditDialog from "../editDialog";
import EquipmentInputs from "../equipmentInputs/equipmentData";
import SendMail from "../sendMail";
import styles from "./equipmentsTable.module.scss";

export default function DetailedInformation({ equipment, reload }) {
  const owner = equipment.owner;

  return (
    <Box sx={{ margin: 2, maxWidth: "100vw" }}>
      <Typography variant="h5" gutterBottom component="div">
        Informações Detalhadas
      </Typography>

      <Box
        sx={{
          margin: 2,
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          justifyContent: "space-around",
        }}
      >
        <Card variant="outlined" sx={{ flexGrow: 1 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom component="div">
              Sobre o Equipamento
            </Typography>
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

        <Card variant="outlined" sx={{ flexGrow: 1 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom component="div">
              Sobre o Cliente
            </Typography>
            <p>{owner.name && `Nome: ${owner.name}`}</p>
            <p>{owner.email && `Email: ${owner.email}`}</p>
            <p>{owner.address && `Endereço: ${owner.address}`}</p>
            <p>{owner.zip && `CEP: ${owner.zip}`}</p>
            <p>{owner.whatsapp && `WhatsApp: ${owner.whatsapp}`}</p>
            <p>{owner.tel && `Telefone: ${owner.tel}`}</p>
            <p>{owner.cpfOrCnpj && `CPF ou CNPJ: ${owner.cpfOrCnpj}`}</p>
          </CardContent>
        </Card>

        <Card variant="outlined" sx={{ flexGrow: 1 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom component="div">
              Sobre o Atendimento
            </Typography>
            <p>{equipment.attendedBy && `Atendido Por: ${equipment.attendedBy}`}</p>
            <p>{equipment.attendedOn && `Local de Atendimento: ${equipment.attendedOn}`}</p>
            <p>{equipment.listOfServices && `Lista de serviços: ${equipment.listOfServices}`}</p>
          </CardContent>
        </Card>
      </Box>

      <div className={styles.flex}>
        {owner.email && <SendMail client={equipment.owner} />}
        <EditDialog
          Inputs={<EquipmentInputs equipment={equipment} />}
          URL={"/api/admin/equipments"}
          title="Editar Equipamento"
          reload={reload}
        />
      </div>
    </Box>
  );
}
