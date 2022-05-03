import "express-async-errors";

import express from "express";
import cors from "cors";
import errorHandler from "./middlewares/errorHandler";
import AuthRoutes from "./routes/auth";
import PrivateRoutes from "./routes/private";
import PublicRoutes from "./routes/public";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Static files
app.use(express.static("public"));

// Routes
app.use("", AuthRoutes);
app.use("", PrivateRoutes);
app.use("", PublicRoutes);

// Error handler middleware
app.use(errorHandler);

// Export default
export default app;
