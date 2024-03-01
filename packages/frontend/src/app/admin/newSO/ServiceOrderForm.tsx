"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

import Form from "@/components/common/Form";
import ClientAndSOInputs from "@/components/common/inputs/ClientAndSO";
import useError from "@/hooks/useError";
import { TClientInput } from "@/types/client";
import { TServiceOrderInput } from "@/types/serviceOrder";
import addClient from "@/utils/mutations/addClient";
import updateClient from "@/utils/mutations/updateClient";

const ServiceOrderForm = () => {
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
    <Form handleSubmit={handleSubmit} title="Cadastrar Nova Ordem de Serviço">
      <ClientAndSOInputs setSelectedClientId={setSelectedClientId} />
    </Form>
  );
};

export default ServiceOrderForm;
