import { withPasswordProtect } from "@storyofams/next-password-protect";
import Head from "next/head";
import { useEffect, useState } from "react";

import EquipmentsTable from "/src/components/equipmentsTable";
import Header from "/src/components/header";

function EditEquipments() {
  const [equipments, setEquipments] = useState(null);

  const load = async () => {
    const res = await fetch("/api/admin/equipments", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    setEquipments(data);
  };
  useEffect(async () => {
    await load();
  }, []);

  return (
    <>
      <Head>
        <title>Editar Ordens de Serviço</title>
      </Head>

      <Header />

      <main style={{ margin: "10vh 5vw" }}>
        {equipments && <EquipmentsTable equipments={equipments} reload={load} />}
      </main>
    </>
  );
}

export default withPasswordProtect(EditEquipments, {
  loginComponentProps: {
    backUrl: "/",
    logo: "/logo.png",
    buttonColor: "#fff",
    buttonBackgroundColor: "#c00000",
  },
});