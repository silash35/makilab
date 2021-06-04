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
        <div id="about">sobre</div>

        <div id="contact">contato</div>
      </main>
      <footer>footer</footer>
    </>
  );
}
