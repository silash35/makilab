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
  try {
    const queryResult = await getProduct(id, locale);

    if (queryResult.status === 404) {
      return fallback.notFound;
    }

    if (queryResult.status !== 200 || !queryResult.product) {
      return fallback.default;
    }

    return <ProductComponent product={queryResult.product} />;
  } catch {
    return fallback.default;
  }
};

export default ProductFetcher;
