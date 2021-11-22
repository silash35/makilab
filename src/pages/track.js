import Head from "next/head";

import Header from "../components/header";
import Track from "../components/track";

export default function TrackPage() {
  return (
    <>
      <Head>
        <title>Verifique o status do seu produto</title>
      </Head>

      <Header />

      <main>
        <Track />
      </main>
    </>
  );
}
