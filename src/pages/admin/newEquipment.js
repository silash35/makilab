import { withPasswordProtect } from "@storyofams/next-password-protect";
import Head from "next/head";

import EquipmentInputs from "@/components/equipmentInputs";
import Form from "@/components/form";
import Header from "@/components/header";

function NewEquipment() {
  return (
    <>
      <Head>
        <title>Cadastrar novo equipamento</title>
      </Head>

      <Header />

      <main>
        <Form Inputs={EquipmentInputs} URL="/api/admin/clients" title="Cadastrar Equipamento" />
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
