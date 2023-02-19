import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";

import Id from "@/components/Id";
import getProduct from "@/utils/getProduct";

const en = {
  title: "Check your product status",
};

const pt = {
  title: "Verifique o status do seu produto",
};

const TrackPage = ({ product, locale }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const t = locale === "en" ? en : pt;

  return (
    <>
      <Head>
        <title>{t.title}</title>
      </Head>

      <Id product={product} />
    </>
  );
};

export default TrackPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = Array.isArray(context.query.id) ? context.query.id[0] : context.query.id;
  const locale = context.locale;

  if (id === undefined) {
    return { notFound: true };
  } else {
    const product = await getProduct(id, locale);
    return {
      props: { product, locale: locale ? locale : "en" },
      notFound: product === "Not found" || product === "Unknown error",
    };
  }
};
