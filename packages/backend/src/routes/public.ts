import { createExpressEndpoints } from "@ts-rest/express";
import { Router } from "express";

import { contract as ProductContract, router as ProductRouter } from "@/modules/product/router";

// Init
const router = Router();

// Public routes will be accessible without authentication by everyone
createExpressEndpoints(ProductContract, ProductRouter, router, { responseValidation: true });

router.get("/", (req, res) => {
  return res.status(200).send("This is a backend of OpenSOM. Where the magic happens.");
});

// Export default
export default router;
