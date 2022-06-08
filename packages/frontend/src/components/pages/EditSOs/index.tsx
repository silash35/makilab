import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";

import ErrorComponent from "@/components/common/ErrorComponent";
import useServiceOrders from "@/hooks/useServiceOrders";

import EquipmentsTable from "./Table";

export default function EditSOs() {
  const { serviceOrders, mutate, error } = useServiceOrders();

  if (serviceOrders) {
    return <EquipmentsTable serviceOrders={serviceOrders} mutate={mutate} />;
  } else {
    return (
      <Stack height="100%" justifyContent="center" alignItems="center">
        {error ? <ErrorComponent /> : <CircularProgress />}
      </Stack>
    );
  }
}
