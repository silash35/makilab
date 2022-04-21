import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import Head from "next/head";

import ClientsTable from "@/components/editClients/table";
import useClients from "@/hooks/useClients";

function EditClients() {
  const { clients, mutate } = useClients();

  return (
    <>
      <Head>
        <title>Gerenciar Clientes</title>
      </Head>

      {clients ? (
        <ClientsTable clients={clients} reload={mutate} />
      ) : (
        <Stack height="100%" justifyContent="center" alignItems="center">
          <CircularProgress />
        </Stack>
      )}
    </>
  );
}

export default EditClients;
