import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { useState } from "react";

import Main from "@/components/OS/main";
import Options from "@/components/OS/options";
import Pdf from "@/components/OS/pdf";
import prisma from "@/database/prisma";
import protect from "@/utils/frontend/protect";

function ServiceOrderPage({
  serviceOrder,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [isPrinting, setIsPrinting] = useState(false);

  return isPrinting ? (
    <Pdf serviceOrder={serviceOrder} />
  ) : (
    <>
      <Head>
        <title>Gerenciar Ordens de Serviço</title>
      </Head>

      <Main>
        <Pdf serviceOrder={serviceOrder} />
        <Options serviceOrder={serviceOrder} setIsPrinting={setIsPrinting} />
      </Main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = Array.isArray(context.query.id) ? context.query.id[0] : context.query.id;

  const serviceOrder = await prisma.serviceOrder.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      owner: true,
    },
  });

  return {
    props: {
      serviceOrder: serviceOrder,
    },
    notFound: id === undefined || serviceOrder === null,
  };
};

export default protect(ServiceOrderPage);
