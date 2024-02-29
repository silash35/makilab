import { createExpressEndpoints } from "@ts-rest/express";
import { Router } from "express";

import { contract as productContract, router as productRouter } from "@/modules/product/router";

// Init
const router = Router();

// Public routes will be accessible without authentication by everyone
createExpressEndpoints(productContract, productRouter, router, {
  responseValidation: true,
});

router.get("/", (req, res) => {
  return res.status(200).send("This is a backend of OpenSOM. Where the magic happens.");
});

export default router;
