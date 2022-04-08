import Head from "next/head";

import Header from "@/components/common/header";
import Track from "@/components/index/track";

export default function TrackPage() {
  return (
    <>
      <Head>
        <title>Check your product status</title>
      </Head>

      <Header />

      <main style={{ display: "contents" }}>
        <Track />
      </main>
    </>
  );
}
