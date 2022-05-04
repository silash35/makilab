import Head from "next/head";

import Form from "@/components/common/form";
import ClientInputs from "@/components/common/inputs/client";

function NewClient() {
  return (
    <>
      <Head>
        <title>Cadastrar novo Cliente</title>
      </Head>

      <Form
        Inputs={<ClientInputs />}
        URL="/api/private/clients"
        title="Cadastrar novo Cliente"
        next={() => "/"}
      />
    </>
  );
}

export default NewClient;
