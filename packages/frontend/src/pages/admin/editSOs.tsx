import Head from "next/head";

import EditSOs from "@/components/pages/EditSOs";

const EditSOsPage = () => {
  return (
    <>
      <Head>
        <title>Gerenciar Ordens de Serviço</title>
      </Head>

      <EditSOs />
    </>
  );
};

export default EditSOsPage;
