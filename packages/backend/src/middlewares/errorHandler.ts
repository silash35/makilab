import type { ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // Log error to console
  console.error(err);

  // Respond to client with error message and status code
  res.header("Content-Type", "application/json");
  res.status(500).send(JSON.stringify(err, null, 4));

  next(err);
};

export default errorHandler;
