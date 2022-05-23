import Head from "next/head";
import { useRouter } from "next/router";
import type { FormEvent } from "react";

import Form from "@/components/common/form";
import ClientInputs from "@/components/common/inputs/client";
import useError from "@/hooks/useError";
import { TClientInput } from "@/types/client";
import addClient from "@/utils/mutations/addClient";

function NewClient() {
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
    <>
      <Head>
        <title>Cadastrar novo Cliente</title>
      </Head>

      <Form title="Cadastrar novo Cliente" handleSubmit={handleSubmit}>
        <ClientInputs />
      </Form>
    </>
  );
}

export default NewClient;
