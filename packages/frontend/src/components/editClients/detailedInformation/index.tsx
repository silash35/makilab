import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import type { FormEvent } from "react";

import DeleteDialog from "@/components/common/deleteDialog";
import EditDialog from "@/components/common/editDialog";
import ClientInputs from "@/components/common/inputs/client";
import SendMailDialog from "@/components/common/sendMailDialog";
import type { TClientInput, TClientWithSOs as Client } from "@/types/client";
import deleteClient from "@/utils/mutations/deleteClient";
import updateClient from "@/utils/mutations/updateClient";

import styles from "./detailedInformation.module.scss";

interface Props {
  client: Client;
  reload: () => void;
}

export default function DetailedInformation({ client, reload }: Props) {
  const handleDeleteClient = async () => {
    const { status } = await deleteClient(client.id);
    return status === 200;
  };

  const handleEditClient = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData) as unknown as TClientInput;

    const { status } = await updateClient(client.id, data);
    reload();
    return status === 200;
  };

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
          title={`Deletar ${client.name}`}
          text={`Tem certeza que deseja excluir o cliente ${client.name}? Todos os seus equipamentos também serão deletados`}
          submit={handleDeleteClient}
        />
        {client.email && <SendMailDialog to={client.email} />}
        <EditDialog title="Editar Cliente" submit={handleEditClient}>
          <ClientInputs client={client} />
        </EditDialog>
      </div>

      <h2>Equipamentos</h2>

      <Box className={styles.cardsContainer}>
        {client.serviceOrders
          ? client.serviceOrders.map((serviceOrder) => {
              return (
                <Card variant="outlined" key={serviceOrder.id}>
                  <CardContent>
                    <h3>{serviceOrder.id && "OS " + serviceOrder.id}</h3>
                    {serviceOrder.deleted && (
                      <Alert severity="error">Esse equipamento foi deletado</Alert>
                    )}
                    <p>
                      Equipamento:
                      {serviceOrder.equipment && " " + serviceOrder.equipment}
                      {serviceOrder.brand && " " + serviceOrder.brand}
                      {serviceOrder.model && " " + serviceOrder.model}
                    </p>
                    <p>{serviceOrder.statusName && `Situação: ${serviceOrder.statusName}`}</p>
                    <p>
                      {serviceOrder.batchOrImei &&
                        `N° de Serie ou IMEI: ${serviceOrder.batchOrImei}`}
                    </p>
                    <p>
                      {serviceOrder.productNumber &&
                        `Product Number: ${serviceOrder.productNumber}`}
                    </p>
                    <p>
                      {serviceOrder.isUnderWarranty
                        ? "Equipamento em Garantia"
                        : "Equipamento Fora de Garantia"}
                    </p>
                    <p>
                      {(() => {
                        if (serviceOrder.isUnderWarranty === false) {
                          if (serviceOrder.isBudgetApproved === null) {
                            return "Orçamento ainda não aprovado";
                          } else if (serviceOrder.isBudgetApproved === false) {
                            return "Orçamento Negado";
                          } else if (serviceOrder.isBudgetApproved === true) {
                            return "Orçamento Aprovado";
                          }
                        }
                      })()}
                    </p>
                  </CardContent>
                </Card>
              );
            })
          : undefined}
      </Box>
    </Box>
  );
}
