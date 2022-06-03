import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { SWRConfig } from "swr";

import Budgets from "@/components/budgets";
import ServiceOrder from "@/types/serviceOrder";
import request from "@/utils/request";

function BudgetsPage({
  id,
  ServiceOrderJSON,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const serviceOrder = JSON.parse(ServiceOrderJSON) as ServiceOrder;

  const fallback = { [`/api/private/budget/serviceOrder/${id}`]: serviceOrder };

  return (
    <>
      <Head>
        <title>Gerenciar Orçamentos</title>
      </Head>
      <SWRConfig value={{ fallback }}>
        <Budgets id={id} />
      </SWRConfig>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = Array.isArray(context.query.id) ? context.query.id[0] : context.query.id;

  const { response } = await request(
    { url: `/api/private/budget/serviceOrder/${id}`, method: "GET" },
    context
  );

  return {
    props: {
      id,
      ServiceOrderJSON: JSON.stringify(response),
    },
    notFound: !id || !response,
  };
};

export default BudgetsPage;
