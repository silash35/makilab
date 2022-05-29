import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import Head from "next/head";

import ErrorComponent from "@/components/common/ErrorComponent";
import EquipmentsTable from "@/components/editEquipments/table";
import useServiceOrders from "@/hooks/useServiceOrders";

function EditSOs() {
  const { serviceOrders, mutate, error } = useServiceOrders();

  return (
    <>
      <Head>
        <title>Gerenciar Ordens de Serviço</title>
      </Head>

      {serviceOrders ? (
        <EquipmentsTable serviceOrders={serviceOrders} reload={mutate} />
      ) : (
        <Stack height="100%" justifyContent="center" alignItems="center">
          {error ? <ErrorComponent /> : <CircularProgress />}
        </Stack>
      )}
    </>
  );
}

export default EditSOs;
