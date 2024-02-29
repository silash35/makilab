import { z } from "zod";

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

export default ProductSchema;
