import Head from "next/head";

import Header from "../components/header";
import Track from "../components/track";

export default function TrackPage() {
  return (
    <>
      <Head>
        <title>MakiLab Serviços</title>
      </Head>

      <Header />

      <main>
        <Track />
      </main>
    </>
  );
}
