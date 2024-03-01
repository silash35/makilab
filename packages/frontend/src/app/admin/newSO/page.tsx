import type { Metadata } from "next";

import ServiceOrderForm from "./ServiceOrderForm";

export const metadata: Metadata = { title: "Cadastrar nova Ordem de Serviço" };

const NewServiceOrder = () => <ServiceOrderForm />;

export default NewServiceOrder;
