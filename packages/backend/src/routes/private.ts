import { Router } from "express";

import protectRoute from "@/middlewares/authentication";
import budgetRouter from "@/modules/budget/router";
import budgetItemRouter from "@/modules/budgetItem/router";
import clientsRouter from "@/modules/client/router";
import mailRouter from "@/modules/mail/router";
import serviceOrdersRouter from "@/modules/serviceOrder/router";

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
