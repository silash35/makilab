import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { notFound } from "next/navigation";

import ProductFetcher from "@/components/ProductFetcher";
import useServerLocale from "@/hooks/useServerLocale";

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
  const { t } = useServerLocale({ en, pt }, locale);

  return (
    <Stack alignItems="center">
      <ProductFetcher
        fallback={{
          loading: (
            <Box margin={8}>
              <CircularProgress />
            </Box>
          ),
          notFound: <NotFound />,
          default: <Typography textAlign="center">{t.unknownError}</Typography>,
        }}
        id={Number(id.replace(/\D/g, ""))}
      />
    </Stack>
  );
};

export default ProductPage;
