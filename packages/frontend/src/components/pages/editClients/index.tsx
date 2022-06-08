import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";

import ErrorComponent from "@/components/common/ErrorComponent";
import useClients from "@/hooks/useClients";

import ClientsTable from "./table";

export default function EditClients() {
  const { clients, mutate, error } = useClients();

  if (clients) {
    return <ClientsTable clients={clients} mutate={mutate} />;
  } else {
    return (
      <Stack height="100%" justifyContent="center" alignItems="center">
        {error ? <ErrorComponent /> : <CircularProgress />}
      </Stack>
    );
  }
}
