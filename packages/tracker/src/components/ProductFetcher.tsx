"use client";

import useProduct from "@/hooks/useProduct";

import ProductComponent from "./Product";

interface ProductFetcherProps {
  id: number;
  fallback: {
    loading: JSX.Element;
    notFound: JSX.Element;
    default: JSX.Element;
  };
}

const ProductFetcher = ({ id, fallback }: ProductFetcherProps) => {
  const { isLoading, isFetching, data, error } = useProduct(id);

  if (isLoading || isFetching) {
    return fallback.loading;
  }

  if (data.status === 200 && data.body) {
    return <ProductComponent product={data.body} />;
  }

  if (error?.status === 404) {
    return fallback.notFound;
  }

  return fallback.default;
};

export default ProductFetcher;
