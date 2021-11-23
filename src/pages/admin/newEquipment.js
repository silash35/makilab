import { withPasswordProtect } from "@storyofams/next-password-protect";
import Head from "next/head";

import EquipmentForm from "/src/components/equipmentForm";
import Header from "/src/components/header";

function NewEquipment() {
  return (
    <>
      <Head>
        <title>Cadastrar novo equipamento</title>
      </Head>

      <Header />

      <main>
        <EquipmentForm />
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
