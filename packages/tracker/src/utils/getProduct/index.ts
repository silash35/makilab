import config from "@config";
import contract from "@opensom/contract";
import { initClient } from "@ts-rest/core";

import processProduct, { ProcessedProduct } from "./processProduct";

const client = initClient(contract, {
  baseUrl: config.BACKEND_URL,
  baseHeaders: { "Content-Type": "application/json" },
});

const getProduct = async (id: number, locale?: string) => {
  try {
    const data = await client.product.get({ params: { id } });
    return {
      ...data,
      product: data.status === 200 ? processProduct(data.body, locale) : undefined,
    };
  } catch (error) {
    return { error };
  }
};

export type { ProcessedProduct as Product };
export default getProduct;
