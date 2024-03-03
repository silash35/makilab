import config from "@config";
import contract from "@opensom/contract";
import { initQueryClient } from "@ts-rest/react-query";

import processProduct, { ProcessedProduct } from "./processProduct";

const client = initQueryClient(contract, {
  baseUrl: config.BACKEND_URL,
  baseHeaders: { "Content-Type": "application/json" },
});

const getProduct = (id: number) => {
  const data = client.product.get.useQuery(["product", id], {
    params: { id },
  });

  return {
    ...data,
    data: {
      ...data.data,
      body: data.data?.status === 200 ? processProduct(data.data.body) : undefined,
    },
  };
};

export type { ProcessedProduct as Product };
export default getProduct;
