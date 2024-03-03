"use client";

import { useRouter } from "next/navigation";
import type { FormEvent } from "react";

import Form from "@/components/Form";
import ClientInputs from "@/components/inputs/Client";
import useError from "@/hooks/useError";
import { TClientInput } from "@/types/client";
import addClient from "@/utils/mutations/addClient";

const ClientForm = () => {
  const { setError } = useError();
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData) as unknown as TClientInput;

    const { error } = await addClient(data);

    if (error) {
      setError(error);
    } else {
      router.push("/");
    }
  };

  return (
    <Form handleSubmit={handleSubmit} title="Cadastrar novo Cliente">
      <ClientInputs />
    </Form>
  );
};

export default ClientForm;
