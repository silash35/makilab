import Head from "next/head";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

import Form from "@/components/common/form";
import ClientAndSOInputs from "@/components/common/inputs/clientAndSO";
import { TClientInput } from "@/types/client";
import { TServiceOrderInput } from "@/types/serviceOrder";
import addClient from "@/utils/mutations/addClient";
import updateClient from "@/utils/mutations/updateClient";

function NewServiceOrder() {
  const router = useRouter();
  const [selectedClientId, setSelectedClientId] = useState(0);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData) as unknown as TServiceOrderInput & TClientInput;

    const { client, status } =
      selectedClientId === 0
        ? await addClient(data, data)
        : await updateClient(selectedClientId, data, data);

    if (status === 200) {
      const createdSO = client.serviceOrders[client.serviceOrders.length - 1];
      router.push(`/admin/SO?id=${String(createdSO.id)}`);
    }
  };

  return (
    <>
      <Head>
        <title>Cadastrar nova Ordem de Serviço</title>
      </Head>

      <Form title="Cadastrar Nova Ordem de Serviço" handleSubmit={handleSubmit}>
        <ClientAndSOInputs setSelectedClientId={setSelectedClientId} />
      </Form>
    </>
  );
}

export default NewServiceOrder;
