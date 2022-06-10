import Head from "next/head";

import Index from "@/components/pages/index/index";

function Home() {
  return (
    <>
      <Head>
        <title>Painel de Administração</title>
      </Head>

      <Index />
    </>
  );
}

export default Home;
