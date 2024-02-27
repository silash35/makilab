import { notFound } from "next/navigation";

import ProductFetcher from "@/components/ProductFetcher";

const en = {
  unknownError: "Unknown error, please try again later",
};

const pt = {
  unknownError: "Erro desconhecido, tente novamente mais tarde",
};

const NotFound = () => {
  notFound();
  return null;
};

const ProductPage = ({ params: { locale, id } }: { params: { locale?: string; id: string } }) => {
  const t = locale === "en" ? en : pt;

  return (
    <ProductFetcher
      fallback={{
        notFound: <NotFound />,
        default: <p>{t.unknownError}</p>,
      }}
      id={Number(id.replace(/\D/g, ""))}
      locale={locale}
    />
  );
};
export default ProductPage;
