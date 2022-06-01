import { Router } from "express";

import protectRoute from "@/middlewares/protect";

import budgetRouter from "./budget";
import budgetItemRouter from "./budgetItem";
import clientsRouter from "./clients";
import mailRouter from "./mail";
import serviceOrdersRouter from "./serviceOrders";

// Init
const router = Router();

// Private routes will need authentication to be accessed
router.use("/api/private/clients", protectRoute, clientsRouter);
router.use("/api/private/serviceOrders", protectRoute, serviceOrdersRouter);
router.use("/api/private/budget", protectRoute, budgetRouter);
router.use("/api/private/budgetItem", protectRoute, budgetItemRouter);
router.use("/api/private/mail", protectRoute, mailRouter);

// Export default
export default router;
