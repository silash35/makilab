import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { SWRConfig } from "swr";

import BudgetTable from "@/components/budget";
import ServiceOrder from "@/types/serviceOrder";
import request from "@/utils/request";

function EditBudget({ id, budgetJSON }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const budget = JSON.parse(budgetJSON) as ServiceOrder;

  const fallback = { [`/api/private/budget/${id}`]: budget };

  return (
    <>
      <Head>
        <title>Editar Orçamento</title>
      </Head>
      <SWRConfig value={{ fallback }}>
        <BudgetTable id={id} />
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

export default EditBudget;
