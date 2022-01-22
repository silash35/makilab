import { withPasswordProtect } from "@storyofams/next-password-protect";
import Head from "next/head";

import Form from "@/components/common/form";
import Header from "@/components/common/header";
import ClientInputs from "@/components/common/inputs/client";

function NewClient() {
  return (
    <>
      <Head>
        <title>Cadastrar novo Cliente</title>
      </Head>

      <Header />

      <main>
        <Form
          Inputs={ClientInputs}
          URL="/api/admin/clients"
          title="Cadastrar novo Cliente"
          next={() => {
            return "/admin";
          }}
        />
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
