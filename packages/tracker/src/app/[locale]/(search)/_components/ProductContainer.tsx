"use client";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { useSearchParams } from "next/navigation";

import ProductFetcher from "@/components/ProductFetcher";
import useLocale from "@/hooks/useLocale";

import en from "./locales/en";
import pt from "./locales/pt";

const ProductContainer = () => {
  const { t } = useLocale({ en, pt });

  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const id = search !== null ? Number(search.replace(/\D/g, "")) : null;

  if (id === null) {
    return null;
  }

  return (
    <ProductFetcher
      fallback={{
        loading: (
          <Box margin={8}>
            <CircularProgress />
          </Box>
        ),
        notFound: <Typography textAlign="center">{t.notFound}</Typography>,
        default: <Typography textAlign="center">{t.unknownError}</Typography>,
      }}
      id={id}
    />
  );
};

export default ProductContainer;
