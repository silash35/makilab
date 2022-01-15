import { withPasswordProtect } from "@storyofams/next-password-protect";
import Head from "next/head";

import AdminMenu from "@/components/adminMenu";
import Header from "@/components/common/header";

function AdminMenuPage() {
  return (
    <>
      <Head>
        <title>Gerenciar Ordens de Serviço</title>
      </Head>

      <Header />

      <main>
        <AdminMenu />
      </main>
    </>
  );
}

export default withPasswordProtect(AdminMenuPage, {
  loginComponentProps: {
    backUrl: "/",
    logo: "/logo.png",
    buttonColor: "#fff",
    buttonBackgroundColor: "#c00000",
  },
});
