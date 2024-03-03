import type { Metadata } from "next";

import Pdf from "../_components/Pdf";

export const metadata: Metadata = { title: "Imprimir Orçamento" };

const BudgetPdfPage = ({ params: { id } }: { params: { id: string } }) => <Pdf id={Number(id)} />;

export default BudgetPdfPage;
