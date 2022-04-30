import express from "express";

import BaseRouter from "./routes/api";

// Constants
const app = express();

// Add some basic middleware
app.use(express.json());

// Add APIs
app.use("/api", BaseRouter);

// Export default
export default app;
