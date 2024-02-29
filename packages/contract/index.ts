import { initContract } from "@ts-rest/core";

import ProductRouter from "./routers/product";

const c = initContract();

export default c.router(
  {
    product: ProductRouter,
  },
  {
    strictStatusCodes: true,
    pathPrefix: "/api",
  },
);
