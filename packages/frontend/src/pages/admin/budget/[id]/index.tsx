import Head from "next/head";

import BudgetTable from "@/components/budget";

function EditBudget() {
  return (
    <>
      <Head>
        <title>Editar Orçamento</title>
      </Head>

      <BudgetTable />
    </>
  );
}

export default EditBudget;
