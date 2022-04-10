import Head from "next/head";
import Header from "@/components/header";
import Track from "@/components/track";
import Info from "@/components/info";
import { useRouter } from "next/router";

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
