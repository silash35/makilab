import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import Head from "next/head";
import { useEffect, useState } from "react";

import ClientsTable from "@/components/editClients/table";
import { Client } from "@/types/Client";
import protect from "@/utils/frontend/protect";
import request from "@/utils/frontend/request";

function EditClients() {
  const [clients, setClients] = useState<null | Client[]>(null);

  const load = async () => {
    setClients(null);

    const data = await request("/api/admin/clients", "GET");
    if (Array.isArray(data)) {
      setClients(data);
    } else {
      return null;
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <>
      <Head>
        <title>Gerenciar Clientes</title>
      </Head>

      {clients ? (
        <ClientsTable clients={clients} reload={load} />
      ) : (
        <Stack alignItems="center">
          <CircularProgress />
        </Stack>
      )}
    </>
  );
}

export default protect(EditClients);
