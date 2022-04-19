import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import Head from "next/head";
import { useEffect, useState } from "react";

import EquipmentsTable from "@/components/editEquipments/table";
import ServiceOrder from "@/types/serviceOrder";
import request from "@/utils/frontend/request";

function EditSOs() {
  const [serviceOrders, setServiceOrders] = useState<null | ServiceOrder[]>(null);

  const load = async () => {
    setServiceOrders(null);

    const data = await request("/api/admin/serviceOrders", "GET");

    if (Array.isArray(data)) {
      setServiceOrders(data);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <>
      <Head>
        <title>Gerenciar Ordens de Serviço</title>
      </Head>

      {serviceOrders ? (
        <EquipmentsTable serviceOrders={serviceOrders} reload={load} />
      ) : (
        <Stack alignItems="center">
          <CircularProgress />
        </Stack>
      )}
    </>
  );
}

export default EditSOs;
