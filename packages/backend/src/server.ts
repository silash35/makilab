import express from "express";

import errorHandler from "@/middlewares/errorHandler";
import BaseRouter from "@/routes/api";

const app = express();

// Middlewares
app.use(express.json());
app.use(errorHandler);

// Add APIs
app.use("/api", BaseRouter);

// Export default
export default app;
