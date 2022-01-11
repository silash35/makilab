import { withPasswordProtect } from "@storyofams/next-password-protect";
import Head from "next/head";

import EquipmentInputs from "/src/components/equipmentInputs";
import Form from "/src/components/form";
import Header from "/src/components/header";

function NewEquipment() {
  return (
    <>
      <Head>
        <title>Cadastrar novo equipamento</title>
      </Head>

      <Header />

      <main>
        <Form Inputs={EquipmentInputs} URL="/api/admin/equipments" title="Cadastrar Equipamento" />
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
