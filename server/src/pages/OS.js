import CircularProgress from "@mui/material/CircularProgress";
import { withPasswordProtect } from "@storyofams/next-password-protect";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Header from "@/components/common/header";
import Main from "@/components/OS/main";
import Options from "@/components/OS/options";
import Pdf from "@/components/OS/pdf";
import processEquipment from "@/utils/processEquipment";
import request from "@/utils/request";

function Equipment() {
  const [isPrinting, setIsPrinting] = useState(false);
  const [equipment, setEquipment] = useState("loading");
  const router = useRouter();
  const { id } = router.query;

  const load = async () => {
    if (id != undefined) {
      setEquipment("loading");

      const data = await request(`/api/equipments?id=${id}`, "GET");

      if (data != "ERROR") {
        setEquipment(processEquipment(data));
      } else {
        setEquipment("ERROR");
      }
    } else {
      if (router.isReady) {
        setEquipment(undefined);
      }
    }
  };

  useEffect(async () => {
    await load();
  }, [id]);

  return isPrinting ? (
    <Pdf equipment={equipment} />
  ) : (
    <>
      <Head>
        <title>Gerenciar Ordens de Serviço</title>
      </Head>

      <Header />

      <Main>
        {(() => {
          if (equipment === "loading") {
            return <CircularProgress />;
          } else if (equipment === "ERROR") {
            return <p>ERRO: ID &ldquo;{id}&rdquo; Invalido. Nenhuma OS encontrada</p>;
          } else if (equipment === undefined) {
            return <p>ERRO: Nenhum ID especificado</p>;
          } else {
            return (
              <>
                <Pdf equipment={equipment} />
                <Options equipment={equipment} setIsPrinting={setIsPrinting} reload={load} />
              </>
            );
          }
        })()}
      </Main>
    </>
  );
}

export default withPasswordProtect(Equipment, {
  loginComponentProps: {
    backUrl: "/",
    logo: "/logo.png",
    buttonColor: "#fff",
    buttonBackgroundColor: "#c00000",
  },
});
