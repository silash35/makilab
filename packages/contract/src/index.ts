import { initContract } from "@ts-rest/core";
import { z } from "zod";

const c = initContract();

const ProductSchema = z.object({
  id: z.number(),

  name: z.string(),
  isUnderWarranty: z.boolean(),
  isBudgetApproved: z.boolean().nullable(),

  createdAt: z.date(),
  budgetedAt: z.date().nullable(),
  budgetAnsweredAt: z.date().nullable(),
  repairedAt: z.date().nullable(),
  deliveredToCustomerAt: z.date().nullable(),
});

export default c.router(
  {
    getProduct: {
      method: "GET",
      path: "/api/public/products/:id",
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
