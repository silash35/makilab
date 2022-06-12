import { Router } from "express";

import authRouter from "@/modules/auth/router";

// Init
const router = Router();

// Auth Routes are related to authentication
router.use("/api/auth", authRouter);

// Export default
export default router;
