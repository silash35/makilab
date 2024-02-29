import { initContract } from "@ts-rest/core";
import { z } from "zod";

import ProductSchema from "../schemas/product";

const c = initContract();

const productRouter = c.router(
  {
    get: {
      method: "GET",
      path: "/public/product/:id",
      pathParams: z.object({
        id: z.coerce.number().int().safe().min(0),
      }),
      responses: {
        200: ProductSchema,
        404: z.null(),
      },
      summary: "Get a product by id (A product is a service order with only public information)",
    },
  },
  {
    strictStatusCodes: true,
  },
);

export default productRouter;
