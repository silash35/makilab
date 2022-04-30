import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { getSession } from "next-auth/react";
import { SWRConfig } from "swr";

import SO from "@/components/SO";
import serviceOrdersManager from "@/database/serviceOrdersManager";
import ServiceOrder from "@/types/serviceOrder";

function ServiceOrderPage({
  id,
  ServiceOrderJSON,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const serviceOrder = JSON.parse(ServiceOrderJSON) as ServiceOrder;

  const fallback = { [`/api/admin/serviceOrders?id=${id}`]: serviceOrder };

  return (
    <>
      <Head>
        <title>Gerenciar Ordem de Serviço</title>
      </Head>
      <SWRConfig value={{ fallback }}>
        <SO id={id} />
      </SWRConfig>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = Array.isArray(context.query.id) ? context.query.id[0] : context.query.id;

  const session = await getSession(context);

  const serviceOrder =
    session?.user?.name === "admin" ? await serviceOrdersManager.readOne(Number(id)) : null;

  return {
    props: {
      id,
      ServiceOrderJSON: JSON.stringify(serviceOrder),
    },
    notFound: id === undefined || serviceOrder == null,
  };
};

export default ServiceOrderPage;
