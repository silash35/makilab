import Head from "next/head";

import Header from "../components/header";

export default function Home() {
  return (
    <>
      <Head>
        <title>MakiLab Serviços</title>
      </Head>

      <Header />

      <main>
        main
        <div id="contact">contato</div>
      </main>
      <footer>footer</footer>
    </>
  );
}
