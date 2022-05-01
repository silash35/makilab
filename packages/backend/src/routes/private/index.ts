import { Router } from "express";

import authMiddleware from "../../middlewares/auth";
import clientsRouter from "./clients";
import mailRouter from "./mail";

// Init
const router = Router();

// AuthMiddleware protected routes will be accessible only if user is logged in
router.use(authMiddleware);

// Private routes will need authentication to be accessed
router.use("/api/private/clients", clientsRouter);
router.use("/api/private/mail", mailRouter);

// Export default
export default router;
