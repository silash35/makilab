import { Router } from "express";

import authRouter from "./auth";
import clientsRouter from "./clients";
import searchRouter from "./search";

// Init
const apiRouter = Router();

// Add routes
apiRouter.use("/auth", authRouter);
apiRouter.use("/clients", clientsRouter);
apiRouter.use("/search", searchRouter);

// Export default
export default apiRouter;
