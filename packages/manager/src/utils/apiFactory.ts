import cookie from "cookie";
import jwt from "jsonwebtoken";
import type { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";

type TMethod = "GET" | "POST" | "PUT" | "DELETE";

interface Methods {
  GET?(req: NextApiRequest, res: NextApiResponse): Promise<void>;
  POST?(req: NextApiRequest, res: NextApiResponse): Promise<void>;
  PUT?(req: NextApiRequest, res: NextApiResponse): Promise<void>;
  DELETE?(req: NextApiRequest, res: NextApiResponse): Promise<void>;
}

export default function apiFactory(methods: Methods, auth = true, enableCors = false) {
  return async function API(req: NextApiRequest, res: NextApiResponse) {
    try {
      if (enableCors === true) {
        await NextCors(req, res, {
          methods: ["POST"],
          origin: "*",
        });
      }

      if (auth === true) {
        // Verify if user is authenticated
        if (!req.headers.cookie) {
          throw Error("Unauthorized");
        }
        const cookies = cookie.parse(req.headers.cookie);
        if (!process.env.COOKIE_NAME || !process.env.PASSWORD) {
          console.error("COOKIE_NAME or PASSWORD not set");
          throw Error("Unauthorized");
        }
        jwt.verify(cookies[process.env.COOKIE_NAME], process.env.PASSWORD);
      }

      // Run requestedMethod
      const requestedMethod = methods[req.method as TMethod];
      if (requestedMethod != undefined) {
        await requestedMethod(req, res);
      } else {
        throw Error("Method Not Allowed");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        switch (error.message) {
          case "Not Found":
            res.statusCode = 404;
            break;

          case "Unauthorized":
            res.statusCode = 401;
            break;

          case "Method Not Allowed":
            res.statusCode = 405;
            break;

          default:
            res.statusCode = 500;
            break;
        }
      } else {
        res.statusCode = 500;
      }
      res.end(JSON.stringify({ error }));
    }
  };
}
