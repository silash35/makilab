import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import DeleteDialog from "@/components/common/deleteDialog";
import EditDialog from "@/components/common/editDialog";
import ClientInputs from "@/components/common/inputs/client";
import SendMailDialog from "@/components/common/sendMailDialog";
import processEquipment from "@/utils/processEquipment";

import styles from "./detailedInformation.module.scss";

export default function DetailedInformation({ client, reload }) {
  return (
    <Box className={styles.detailedInformation}>
      <h2>Informações Detalhadas</h2>

      <p>{client.name && `Nome: ${client.name}`}</p>
      <p>{client.email && `Email: ${client.email}`}</p>
      <p>{client.address && `Endereço: ${client.address}`}</p>
      <p>{client.zip && `CEP: ${client.zip}`}</p>
      <p>{client.whatsapp && `WhatsApp: ${client.whatsapp}`}</p>
      <p>{client.tel && `Telefone: ${client.tel}`}</p>
      <p>{client.cpfOrCnpj && `CPF ou CNPJ: ${client.cpfOrCnpj}`}</p>

      <div className={styles.flex}>
        <DeleteDialog
          id={client.id}
          URL={"/api/admin/clients"}
          title={`Deletar ${client.name}`}
          text={`Tem certeza que deseja excluir o cliente ${client.name}? Todos os seus equipamentos também serão deletados`}
          reload={reload}
        />
        {client.email && <SendMailDialog client={client} />}
        <EditDialog
          Inputs={<ClientInputs client={client} />}
          URL={"/api/admin/clients"}
          title="Editar Cliente"
          reload={reload}
        />
      </div>

      <h2>Equipamentos</h2>

      <Box className={styles.cardsContainer}>
        {client.equipment.map((equipment) => {
          equipment = processEquipment(equipment);
          return (
            <Card variant="outlined" key={equipment.id}>
              <CardContent>
                <h3>{equipment.id && "OS " + equipment.id}</h3>
                <p>
                  Equipamento:
                  {equipment.name && " " + equipment.name}
                  {equipment.brand && " " + equipment.brand}
                  {equipment.model && " " + equipment.model}
                </p>
                <p>{equipment.statusName && `Situação: ${equipment.statusName}`}</p>
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
              </CardContent>
            </Card>
          );
        })}
      </Box>
    </Box>
  );
}
