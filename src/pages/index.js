import Head from "next/head";

import Header from "@/components/common/header";
import Track from "@/components/index/track";

export default function TrackPage() {
  return (
    <>
      <Head>
        <title>Verifique o status do seu produto</title>
      </Head>

      <Header />

      <main style={{ display: "contents" }}>
        <Track />
      </main>
    </>
  );
}
