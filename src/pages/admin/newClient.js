import { withPasswordProtect } from "@storyofams/next-password-protect";
import Head from "next/head";

import ClientForm from "/src/components/clientForm";
import Header from "/src/components/header";

function NewClient() {
  return (
    <>
      <Head>
        <title>Cadastrar novo Cliente</title>
      </Head>

      <Header />

      <main>
        <ClientForm />
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
