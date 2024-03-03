import type { Metadata } from "next";

import Budget from "./_components/Budget";

export const metadata: Metadata = { title: "Editar Orçamento" };

const BudgetPage = ({ params: { id } }: { params: { id: string } }) => <Budget id={id} />;

export default BudgetPage;
