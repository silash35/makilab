import { withPasswordProtect } from "@storyofams/next-password-protect";
import Head from "next/head";

import ClientInputs from "@/components/clientInputs";
import Form from "@/components/form";
import Header from "@/components/header";

function NewClient() {
  return (
    <>
      <Head>
        <title>Cadastrar novo Cliente</title>
      </Head>

      <Header />

      <main>
        <Form Inputs={ClientInputs} URL="/api/admin/clients" title="Cadastrar novo Cliente" />
      </main>
    </>
  );
}

export default withPasswordProtect(NewClient, {
  loginComponentProps: {
    backUrl: "/",
    logo: "/logo.png",
    buttonColor: "#fff",
    buttonBackgroundColor: "#c00000",
  },
});
