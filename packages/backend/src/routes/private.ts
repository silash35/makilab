import { Router } from "express";

import authorization from "@/middlewares/authorization";
import budgetRouter from "@/modules/budget/router";
import budgetItemRouter from "@/modules/budgetItem/router";
import clientsRouter from "@/modules/client/router";
import mailRouter from "@/modules/mail/router";
import serviceOrdersRouter from "@/modules/serviceOrder/router";

// Init
const router = Router();

// Private routes will need special privileges to be accessed
router.use("/api/private/clients", authorization(), clientsRouter);
router.use("/api/private/serviceOrders", authorization(), serviceOrdersRouter);
router.use("/api/private/budget", authorization(), budgetRouter);
router.use("/api/private/budgetItem", authorization(), budgetItemRouter);
router.use("/api/private/mail", authorization(), mailRouter);

// Export default
export default router;
