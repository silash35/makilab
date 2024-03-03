import type { Metadata } from "next";

import EditSOs from "./_components/editSOs";

export const metadata: Metadata = { title: "Gerenciar Ordens de Serviço" };

const EditSOsPage = () => <EditSOs />;

export default EditSOsPage;
