import { withPasswordProtect } from "@storyofams/next-password-protect";
import Head from "next/head";

import AdminOptions from "/src/components/adminOptions";
import Header from "/src/components/header";

function Admin() {
  return (
    <>
      <Head>
        <title>Gerenciar Ordens de Serviço</title>
      </Head>

      <Header />

      <main>
        <AdminOptions />
      </main>
    </>
  );
}

export default withPasswordProtect(Admin, {
  loginComponentProps: {
    backUrl: "/",
    logo: "/logo.png",
    buttonColor: "#fff",
    buttonBackgroundColor: "#c00000",
  },
});
