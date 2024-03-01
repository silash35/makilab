import type { Metadata } from "next";

import Budgets from "@/components/pages/SO/Budgets";

export const metadata: Metadata = { title: "Gerenciar Orçamentos" };

const BudgetsPage = ({ params: { id } }: { params: { id: string } }) => {
  return <Budgets id={id} />;
};

export default BudgetsPage;
