import Head from "next/head";

import About from "../components/about";
import Header from "../components/header";

export default function Home() {
  return (
    <>
      <Head>
        <title>MakiLab Serviços</title>
      </Head>

      <Header />

      <main>
        <About />
      </main>

      {/*
      <footer>footer</footer>
      */}
    </>
  );
}
