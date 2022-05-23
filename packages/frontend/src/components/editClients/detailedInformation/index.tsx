import Box from "@mui/material/Box";
import type { FormEvent } from "react";

import DeleteDialog from "@/components/common/deleteDialog";
import EditDialog from "@/components/common/editDialog";
import ClientInputs from "@/components/common/inputs/client";
import SendMailDialog from "@/components/common/sendMailDialog";
import ServiceOrderCard from "@/components/editClients/detailedInformation/serviceOrderCard";
import useError from "@/hooks/useError";
import type { TClientInput, TClientWithSOs as Client } from "@/types/client";
import deleteClient from "@/utils/mutations/deleteClient";
import updateClient from "@/utils/mutations/updateClient";

import styles from "./detailedInformation.module.scss";

interface Props {
  client: Client;
  reload: () => void;
}

export default function DetailedInformation({ client, reload }: Props) {
  const { setError } = useError();

  const handleDeleteClient = async () => {
    const { error } = await deleteClient(client.id);

    if (error) {
      setError(error);
      return false;
    } else {
      reload();
      return true;
    }
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
        {client.email && <SendMailDialog to={client.email} defaultText="" />}
        <EditDialog title="Editar Cliente" submit={handleEditClient}>
          <ClientInputs client={client} />
        </EditDialog>
      </div>

      {client.serviceOrders.length > 0 && (
        <>
          <h2>Equipamentos</h2>

          <Box className={styles.cardsContainer}>
            {client.serviceOrders.map((serviceOrder) => {
              return <ServiceOrderCard serviceOrder={serviceOrder} key={serviceOrder.id} />;
            })}
          </Box>
        </>
      )}
    </Box>
  );
}
