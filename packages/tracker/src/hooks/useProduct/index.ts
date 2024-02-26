import config from "@config";
import contract from "@opensom/contract";
import { initQueryClient } from "@ts-rest/react-query";

import useLocale from "@/hooks/useLocale";

import processProduct, { ProcessedProduct } from "./processProduct";

const client = initQueryClient(contract, {
  baseUrl: config.BACKEND_URL,
  baseHeaders: { "Content-Type": "application/json" },
});

const useProduct = (id: number, enabled: boolean) => {
  const { locale } = useLocale();

  const queryResult = client.getProduct.useQuery(
    ["product", id],
    { params: { id } },
    { enabled, queryKey: ["product", id] },
  );

  let product: ProcessedProduct | undefined = undefined;
  if (queryResult.status === "success" && queryResult.data.status === 200) {
    product = processProduct(queryResult.data.body, locale);
  }

  return {
    ...queryResult,
    product,
  };
};

export type { ProcessedProduct as Product };
export default useProduct;
