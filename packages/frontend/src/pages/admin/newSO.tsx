import Head from "next/head";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

import Form from "@/components/common/Form";
import ClientAndSOInputs from "@/components/common/inputs/ClientAndSO";
import useError from "@/hooks/useError";
import { TClientInput } from "@/types/client";
import { TServiceOrderInput } from "@/types/serviceOrder";
import addClient from "@/utils/mutations/addClient";
import updateClient from "@/utils/mutations/updateClient";

function NewServiceOrder() {
  const { setError } = useError();
  const router = useRouter();

  const [selectedClientId, setSelectedClientId] = useState(0);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData) as unknown as TServiceOrderInput & TClientInput;

    const { client, error } =
      selectedClientId === 0
        ? await addClient(data, data)
        : await updateClient(selectedClientId, data, data);

    if (error) {
      setError(error);
    } else {
      const createdSO = client.serviceOrders[client.serviceOrders.length - 1];
      router.push(`/admin/SO/${String(createdSO.id)}`);
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
