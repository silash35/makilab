import Head from "next/head";

import Form from "@/components/common/form";
import OSInputs from "@/components/common/inputs/os";
import protect from "@/utils/protect";

function NewEquipment() {
  return (
    <>
      <Head>
        <title>Cadastrar novo equipamento</title>
      </Head>

      <Form
        Inputs={OSInputs}
        URL="/api/admin/clients"
        title="Cadastrar Nova Ordem de Serviço"
        next={(res) => {
          return `/admin/OS?id=${res.equipment[res.equipment.length - 1].id}`;
        }}
      />
    </>
  );
}

export default protect(NewEquipment);
