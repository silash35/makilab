import { withPasswordProtect } from "@storyofams/next-password-protect";
import Head from "next/head";

import AdminMenu from "@/components/adminMenu";
import Header from "@/components/common/header";

function AdminMenuPage() {
  return (
    <>
      <Head>
        <title>Painel de Administração</title>
      </Head>

      <Header />

      <main style={{ display: "contents" }}>
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
