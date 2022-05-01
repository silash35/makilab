import "express-async-errors";

import express from "express";

import errorHandler from "./middlewares/errorHandler";
import BaseRouter from "./routes/api";

const app = express();

// Middlewares
app.use(express.json());

// Routes
app.use("/api", BaseRouter);
app.get("/", (req, res) => {
  return res.status(200).send("This is a backend of OpenSOM. The APIs are available at /api");
});

// Error handler middleware
app.use(errorHandler);

// Export default
export default app;
