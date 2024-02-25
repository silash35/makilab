import contract from "@opensom/contract";
import { initServer } from "@ts-rest/express";

import serviceOrderService from "../serviceOrder/service";
import productProcessor from "./processor";

const s = initServer();

const router = s.router(contract, {
  getProduct: async ({ params: { id } }) => {
    const serviceOrder = await serviceOrderService.getOne(id);

    if (!serviceOrder) {
      return {
        status: 404,
        body: null,
      };
    }

    return {
      status: 200,
      body: productProcessor(serviceOrder),
    };
  },
});

export { contract, router };

export default router;
