import Head from "next/head";

import Form from "@/components/common/form";
import OSInputs from "@/components/common/inputs/os";
import { Client } from "@/types/Client";

function NewServiceOrder() {
  return (
    <>
      <Head>
        <title>Cadastrar nova Ordem de Serviço</title>
      </Head>

      <Form
        Inputs={OSInputs}
        URL="/api/admin/clients"
        title="Cadastrar Nova Ordem de Serviço"
        next={(response) => {
          const serviceOrders = (response as Client).serviceOrders;
          if (serviceOrders.length <= 0) {
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
