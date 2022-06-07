import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import Head from "next/head";

import ErrorComponent from "@/components/common/ErrorComponent";
import ClientsTable from "@/components/editClients/table";
import useClients from "@/hooks/useClients";

function EditClients() {
  const { clients, mutate, error } = useClients();

  return (
    <>
      <Head>
        <title>Gerenciar Clientes</title>
      </Head>

      {clients ? (
        <ClientsTable clients={clients} mutate={mutate} />
      ) : (
        <Stack height="100%" justifyContent="center" alignItems="center">
          {error ? <ErrorComponent /> : <CircularProgress />}
        </Stack>
      )}
    </>
  );
}

export default EditClients;
