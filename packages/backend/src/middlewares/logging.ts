import type { RequestHandler } from "express";

const logger: RequestHandler = (req, res, next) => {
  const current_dateTime = new Date();
  const formatted_date = `${current_dateTime.toLocaleDateString(
    "pt-BR",
  )} ${current_dateTime.toLocaleTimeString("pt-BR")}`;

  const method = req.method;
  const url = req.url;
  const user = `user:${req.user.name}`;

  const log = `[${formatted_date}] ${user} ${method}:${url}`;
  console.log(log);
  next();
};

export default logger;
