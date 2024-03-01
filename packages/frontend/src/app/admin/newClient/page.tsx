import type { Metadata } from "next";

import ClientForm from "./ClientForm";

export const metadata: Metadata = { title: "Cadastrar novo Cliente" };

const NewClient = () => <ClientForm />;

export default NewClient;
