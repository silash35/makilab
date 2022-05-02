import { Router } from "express";

import protectRoute from "../../middlewares/protect";
import clientsRouter from "./clients";
import mailRouter from "./mail";

// Init
const router = Router();

// Private routes will need authentication to be accessed
router.use("/api/private/clients", protectRoute, clientsRouter);
router.use("/api/private/mail", protectRoute, mailRouter);

// Export default
export default router;
