import type { ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (err, req, res) => {
  // Log error to console
  console.error(err);

  // Respond to client with error message and status code

  let statusCode = 500;

  if (err instanceof Error) {
    if (err.message === "Not Found") {
      statusCode = 404;
    } else if (err.message === "Unauthorized") {
      statusCode = 401;
    } else if (err.message === "Method Not Allowed") {
      statusCode = 405;
    } else if (err.message.includes("Invalid data")) {
      statusCode = 400;
    }
  }

  res.header("Content-Type", "application/json");
  return res.status(statusCode).send(JSON.stringify(err, null, 4));
};

export default errorHandler;
