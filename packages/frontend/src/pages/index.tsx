import Head from "next/head";

import AdminMenu from "@/components/adminMenu";

function Home() {
  return (
    <>
      <Head>
        <title>Painel de Administração</title>
      </Head>

      <AdminMenu />
    </>
  );
}

export default Home;
