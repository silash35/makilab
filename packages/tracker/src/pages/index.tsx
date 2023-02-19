import Head from "next/head";
import { useRouter } from "next/router";

import Index from "@/components/Index";

const en = {
  title: "Check your product status",
};

const pt = {
  title: "Verifique o status do seu produto",
};

const IndexPage = () => {
  const router = useRouter();
  const t = router.locale === "en" ? en : pt;

  return (
    <>
      <Head>
        <title>{t.title}</title>
      </Head>

      <Index />
    </>
  );
};

export default IndexPage;
