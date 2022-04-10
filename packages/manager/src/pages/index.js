import { withPasswordProtect } from "@storyofams/next-password-protect";
import Head from "next/head";

import AdminMenu from "@/components/adminMenu";
import Header from "@/components/common/header";

function AdminMenuPage() {
  return (
    <>
      <Head>
        <title>Admin Panel</title>
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
    logo: "/icon.svg",
    buttonColor: "#fff",
    buttonBackgroundColor: "#2ec27e",
  },
});
