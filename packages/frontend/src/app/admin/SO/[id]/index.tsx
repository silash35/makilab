import type { Metadata } from "next";

import SO from "@/components/pages/SO";

export const metadata: Metadata = { title: "Gerenciar Ordem de Serviço" };

const ServiceOrderPage = ({ params: { id } }: { params: { id: string } }) => <SO id={id} />;

export default ServiceOrderPage;
