import { Router } from "express";

import authRouter from "./signin";

// Init
const router = Router();

// Auth Routes are related to authentication
router.use("/api/auth/signin", authRouter);

// Export default
export default router;
