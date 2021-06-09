import Head from "next/head";

import About from "../components/about";
import Header from "../components/header";
import Services from "../components/services";
import Partners from "../components/partners";

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
        <Partners />
      </main>

      {/*
      <footer>footer</footer>
      */}
    </>
  );
}
