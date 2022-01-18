import Button from "@mui/material/Button";
import { withPasswordProtect } from "@storyofams/next-password-protect";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Header from "@/components/common/header";
import Pdf from "@/components/equipment/pdf";
import processEquipment from "@/utils/processEquipment";

function Equipment() {
  const [isPrinting, setIsPrinting] = useState(false);
  const [equipment, setEquipment] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  const load = async () => {
    setEquipment(null);

    const res = await fetch(`/api/admin/equipments?id=${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    setEquipment(processEquipment(data));
  };

  useEffect(async () => {
    await load();
  }, []);

  const print = () => {
    setIsPrinting(true);

    setTimeout(() => {
      window.print();
      setIsPrinting(false);
    }, 100);
  };

  return isPrinting ? (
    <Pdf equipment={equipment} />
  ) : (
    <>
      <Head>
        <title>Gerenciar Ordens de Serviço</title>
      </Head>

      <Header />

      <main style={{ display: "flex" }}>
        <Pdf equipment={equipment} />
        <Button variant="contained" onClick={print}>
          Gerar PDF
        </Button>
      </main>
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
