import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { notFound } from "next/navigation";

import ProductFetcher from "@/components/ProductFetcher";
import useServerLocale from "@/hooks/useServerLocale";

import en from "./locales/en";
import pt from "./locales/pt";

interface Props {
  params: { locale?: string; id: string };
}

export function generateMetadata({ params: { locale, id } }: Props) {
  const { t } = useServerLocale({ en, pt }, locale);

  return {
    title: `${t.SO} ${Number(id.replace(/\D/g, ""))}`,
  };
}

const ProductPage = ({ params: { locale, id } }: Props) => {
  const { t } = useServerLocale({ en, pt }, locale);

  return (
    <Stack component="main" margin="auto">
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

const NotFound = () => {
  notFound();
  return null;
};
