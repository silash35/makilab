import Head from "next/head";

import EditClients from "@/components/pages/EditClients";

const EditClientsPage = () => (
  <>
    <Head>
      <title>Gerenciar Clientes</title>
    </Head>

    <EditClients />
  </>
);

export default EditClientsPage;
