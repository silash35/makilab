import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";

import SO from "@/components/SO";
import serviceOrdersManager from "@/database/serviceOrdersManager";
import processSO from "@/utils/frontend/processSO";

function ServiceOrderPage({
  ServiceOrderJSON,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const serviceOrder = JSON.parse(ServiceOrderJSON);

  return (
    <>
      <Head>
        <title>Gerenciar Ordem de Serviço</title>
      </Head>

      <SO serviceOrder={serviceOrder} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = Array.isArray(context.query.id) ? context.query.id[0] : context.query.id;

  const serviceOrder = await serviceOrdersManager.readOne(Number(id));

  const processedOS = serviceOrder ? processSO(serviceOrder) : {};

  return {
    props: {
      ServiceOrderJSON: JSON.stringify(processedOS),
    },
    notFound: id === undefined || serviceOrder === null,
  };
};

export default ServiceOrderPage;
