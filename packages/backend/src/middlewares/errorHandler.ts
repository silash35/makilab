import type { ErrorRequestHandler } from "express";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // Log error to console
  console.error(err);

  // Respond to client with error message and status code

  let statusCode = 500;

  if (err instanceof Error) {
    if (err.message === "Not Found") {
      statusCode = 404;
    } else if (err.message.includes("Unauthorized")) {
      statusCode = 401;
    } else if (err.message.includes("Invalid data")) {
      statusCode = 400;
    }
  }

  return res.status(statusCode).send({
    statusCode: statusCode,
    message: err.message,
  });
};

export default errorHandler;
