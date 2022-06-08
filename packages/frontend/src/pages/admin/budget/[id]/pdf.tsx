import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { SWRConfig } from "swr";

import Pdf from "@/components/pages/budget/pdf";
import ServiceOrder from "@/types/serviceOrder";
import request from "@/utils/request";

function BudgetPdfPage({ id, budgetJSON }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const budget = JSON.parse(budgetJSON) as ServiceOrder;

  const fallback = { [`/api/private/budget/${id}`]: budget };

  return (
    <>
      <Head>
        <title>Imprimir Orçamento</title>
      </Head>
      <SWRConfig value={{ fallback }}>
        <Pdf id={id} />
      </SWRConfig>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = Array.isArray(context.query.id) ? context.query.id[0] : context.query.id;

  const { response } = await request({ url: `/api/private/budget/${id}`, method: "GET" }, context);

  return {
    props: {
      id,
      budgetJSON: JSON.stringify(response),
    },
    notFound: !id || !response,
  };
};

export default BudgetPdfPage;
