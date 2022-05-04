import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import Head from "next/head";

import EquipmentsTable from "@/components/editEquipments/table";
import useServiceOrders from "@/hooks/useServiceOrders";

function EditSOs() {
  const { serviceOrders, mutate } = useServiceOrders();

  return (
    <>
      <Head>
        <title>Gerenciar Ordens de Serviço</title>
      </Head>

      {serviceOrders ? (
        <EquipmentsTable serviceOrders={serviceOrders} reload={mutate} />
      ) : (
        <Stack height="100%" justifyContent="center" alignItems="center">
          <CircularProgress />
        </Stack>
      )}
    </>
  );
}

export default EditSOs;
