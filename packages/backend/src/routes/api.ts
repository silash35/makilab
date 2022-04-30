import { Router } from "express";

import searchRouter from "./search";

// Init
const apiRouter = Router();

// Add api routes
apiRouter.use("/search", searchRouter);

// Export default
export default apiRouter;
