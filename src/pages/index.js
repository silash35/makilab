import Head from "next/head";

import About from "../components/about";
import Contact from "../components/contact";
import Header from "../components/header";
import Partners from "../components/partners";
import ScrollBack from "../components/scrollBack";
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
        <Partners />
        <Contact />
      </main>

      <ScrollBack />
    </>
  );
}
