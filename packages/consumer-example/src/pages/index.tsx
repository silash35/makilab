import Head from "next/head";
import { useRouter } from "next/router";

import Header from "@/components/header";
import Info from "@/components/info";
import Track from "@/components/track";

const en = {
  title: "Check your product status",
};

const pt = {
  title: "Verifique o status do seu produto",
};

export default function TrackPage() {
  const router = useRouter();
  const { locale } = router;
  const t = locale === "en" ? en : pt;

  return (
    <>
      <Head>
        <title>{t.title}</title>
      </Head>

      <Header />

      <main style={{ display: "contents" }}>
        <Track />
        <Info />
      </main>
    </>
  );
}
