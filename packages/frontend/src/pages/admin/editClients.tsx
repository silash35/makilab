import Head from "next/head";

import EditClients from "@/components/pages/editClients";

function EditClientsPage() {
  return (
    <>
      <Head>
        <title>Gerenciar Clientes</title>
      </Head>

      <EditClients />
    </>
  );
}

export default EditClientsPage;
