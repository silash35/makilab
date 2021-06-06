import Head from "next/head";

import About from "../components/about";
import Header from "../components/header";
import Services from "../components/services";

export default function Home() {
  return (
    <>
      <Head>
        <title>MakiLab Serviços</title>
      </Head>

      <Header />

      <main>
        <About />
        <Services />
      </main>

      {/*
      <footer>footer</footer>
      */}
    </>
  );
}
