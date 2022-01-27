import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import { withPasswordProtect } from "@storyofams/next-password-protect";
import Head from "next/head";
import { useEffect, useState } from "react";

import Header from "@/components/common/header";
import ClientsTable from "@/components/editClients/table";

function EditClients() {
  const [clients, setClients] = useState(null);

  const load = async () => {
    setClients(null);

    const res = await fetch("/api/admin/clients", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (Array.isArray(data)) {
      setClients(data);
    } else {
      return null;
    }
  };

  useEffect(async () => {
    await load();
  }, []);

  return (
    <>
      <Head>
        <title>Gerenciar Clientes</title>
      </Head>

      <Header />

      <main style={{ padding: "10vh 5vw" }}>
        {clients ? (
          <ClientsTable clients={clients} reload={load} />
        ) : (
          <Stack alignItems="center">
            <CircularProgress />
          </Stack>
        )}
      </main>
    </>
  );
}

export default withPasswordProtect(EditClients, {
  loginComponentProps: {
    backUrl: "/",
    logo: "/logo.png",
    buttonColor: "#fff",
    buttonBackgroundColor: "#c00000",
  },
});