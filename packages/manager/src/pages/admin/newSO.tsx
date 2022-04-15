import Head from "next/head";

import Form from "@/components/common/form";
import OSInputs from "@/components/common/inputs/os";

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
        next={(serviceOrders) => {
          if (!serviceOrders) {
            return "/";
          }
          return `/admin/SO?id=${serviceOrders[serviceOrders.length - 1].id}`;
        }}
      />
    </>
  );
}

export default NewServiceOrder;
