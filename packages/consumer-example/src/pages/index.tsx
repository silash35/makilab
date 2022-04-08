import Head from "next/head";
import Header from "@/components/header";
import Track from "@/components/track";
import Info from "@/components/info";

export default function TrackPage() {
  return (
    <>
      <Head>
        <title>Check your product status</title>
      </Head>

      <Header />

      <main style={{ display: "contents" }}>
        <Track />
        <Info />
      </main>
    </>
  );
}
