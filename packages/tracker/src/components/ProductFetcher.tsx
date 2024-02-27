import getProduct from "@/utils/getProduct";

import ProductComponent from "./Product";

interface ProductFetcherProps {
  id: number;
  locale?: string;
  fallback: {
    notFound: JSX.Element;
    default: JSX.Element;
  };
}

const ProductFetcher = async ({ id, locale, fallback }: ProductFetcherProps) => {
  const queryResult = await getProduct(id, locale);

  if (!("status" in queryResult)) {
    return fallback?.default;
  }

  if (queryResult.status === 404) {
    return fallback.notFound;
  }

  if (queryResult.status !== 200 || !queryResult.product) {
    return fallback.default;
  }

  return <ProductComponent product={queryResult.product} />;
};

export default ProductFetcher;
