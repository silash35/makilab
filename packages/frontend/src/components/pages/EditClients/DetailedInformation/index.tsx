import Box from "@mui/material/Box";

import { ConfirmationDialogButton } from "@/components/common/dialogs/ConfirmationDialog";
import { FormDialogButton } from "@/components/common/dialogs/FormDialog";
import ClientInputs from "@/components/common/inputs/Client";
import SendMailDialog from "@/components/common/SendMailDialog";
import type { TClientInput, TClientWithSOs as Client } from "@/types/client";
import deleteClient from "@/utils/mutations/deleteClient";
import updateClient from "@/utils/mutations/updateClient";

import styles from "./detailedInformation.module.scss";
import ServiceOrderCard from "./ServiceOrderCard";

interface Props {
  client: Client;
  mutate: () => void;
}

const DetailedInformation = ({ client, mutate }: Props) => {
  const handleDeleteClient = async () => {
    const { error } = await deleteClient(client.id);
    mutate();
    return error;
  };

  const editClient = async (data: unknown) => {
    const { error } = await updateClient(client.id, data as TClientInput);
    mutate();
    return error;
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
        <ConfirmationDialogButton
          confirmationDialogProps={{
            title: `Deletar ${client.name}`,
            text: `Tem certeza que deseja excluir o cliente ${client.name}? Todos os seus equipamentos também serão deletados`,
            yesButtonText: "Deletar",
            showLoading: true,
            submit: handleDeleteClient,
          }}
          buttonText="Deletar"
        />
        {client.email && <SendMailDialog defaultText="" to={client.email} />}
        <FormDialogButton
          formDialogProps={{
            title: "Editar Cliente",
            children: <ClientInputs client={client} />,
            yesButtonText: "Confirmar",
            showLoading: true,
            submit: editClient,
          }}
          buttonText="Editar Cliente"
        />
      </div>

      {client.serviceOrders.length > 0 && (
        <>
          <h2>Equipamentos</h2>

          <Box className={styles.cardsContainer}>
            {client.serviceOrders.map((serviceOrder) => (
              <ServiceOrderCard key={serviceOrder.id} serviceOrder={serviceOrder} />
            ))}
          </Box>
        </>
      )}
    </Box>
  );
};

export default DetailedInformation;
