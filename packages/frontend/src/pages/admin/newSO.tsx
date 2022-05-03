import Head from "next/head";
import { useState } from "react";

import Form from "@/components/common/form";
import OSInputs from "@/components/common/inputs/os";
import Client from "@/types/client";

function NewServiceOrder() {
  const [isNewClient, setIsNewClient] = useState(true);

  return (
    <>
      <Head>
        <title>Cadastrar nova Ordem de Serviço</title>
      </Head>

      <Form
        Inputs={<OSInputs setIsNewClient={setIsNewClient} />}
        URL="/api/private/clients"
        method={isNewClient ? "POST" : "PUT"}
        title="Cadastrar Nova Ordem de Serviço"
        next={(response) => {
          const serviceOrders = (response as Client).serviceOrders;

          if (!serviceOrders || serviceOrders.length <= 0) {
            throw new Error("Service Order was not created");
          }

          const createdSO = serviceOrders[serviceOrders.length - 1];
          if (createdSO.id !== null || createdSO.id !== undefined) {
            return `/admin/SO?id=${String(createdSO.id)}`;
          } else {
            return "";
          }
        }}
      />
    </>
  );
}

export default NewServiceOrder;
