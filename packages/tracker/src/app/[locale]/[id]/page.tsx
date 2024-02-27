import Stack from "@mui/material/Stack";

import ProductFetcher from "@/components/ProductFetcher";

const en = {
  notFound: "No products found",
  unknownError: "Unknown error, please try again later",
};

const pt = {
  notFound: "Nenhum produto encontrado",
  unknownError: "Erro desconhecido, tente novamente mais tarde",
};

const ProductPage = ({ params: { locale, id } }: { params: { locale?: string; id: string } }) => {
  const t = locale === "en" ? en : pt;

  return (
    <Stack alignItems="center">
      <ProductFetcher
        fallback={{
          notFound: <p>{t.notFound}</p>,
          default: <p>{t.unknownError}</p>,
        }}
        id={Number(id.replace(/\D/g, ""))}
        locale={locale}
      />
    </Stack>
  );
};
export default ProductPage;
