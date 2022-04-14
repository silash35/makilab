import type { ServiceOrder } from "@prisma/client";
import Head from "next/head";

import Form from "@/components/common/form";
import OSInputs from "@/components/common/inputs/os";
import protect from "@/utils/frontend/protect";

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
        next={(res: { serviceOrders: ServiceOrder[] }) => {
          return `/admin/SO?id=${res.serviceOrders[res.serviceOrders.length - 1].id}`;
        }}
      />
    </>
  );
}

export default protect(NewServiceOrder);
