import { Router } from "express";

import protectRoute from "@/middlewares/protect";

import signinRouter from "./auth/signin";
import UserRouter from "./auth/user";

// Init
const router = Router();

// Auth Routes are related to authentication
router.use("/api/auth/signin", signinRouter);
router.use("/api/auth/user", protectRoute, UserRouter);

// Export default
export default router;
