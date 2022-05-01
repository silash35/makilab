import express from "express";

import errorHandler from "@/middlewares/errorHandler";
import BaseRouter from "@/routes/api";

const app = express();

// Middlewares
app.use(express.json());
app.use(errorHandler);

// Add APIs
app.use("/api", BaseRouter);

app.get("/", (req, res) => {
  return res.status(200).send("This is a backend of OpenSOM. The APIs are available at /api");
});

// Export default
export default app;
