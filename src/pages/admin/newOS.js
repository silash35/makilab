import { withPasswordProtect } from "@storyofams/next-password-protect";
import Head from "next/head";

import Form from "@/components/common/form";
import Header from "@/components/common/header";
import OSInputs from "@/components/common/inputs/os";

function NewEquipment() {
  return (
    <>
      <Head>
        <title>Cadastrar novo equipamento</title>
      </Head>

      <Header />

      <main>
        <Form Inputs={OSInputs} URL="/api/admin/clients" title="Cadastrar Nova Ordem de Serviço" />
      </main>
    </>
  );
}

export default withPasswordProtect(NewEquipment, {
  loginComponentProps: {
    backUrl: "/",
    logo: "/logo.png",
    buttonColor: "#fff",
    buttonBackgroundColor: "#c00000",
  },
});
