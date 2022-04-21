import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import NextCors from "nextjs-cors";

type TMethod = "GET" | "POST" | "PUT" | "DELETE";

interface Methods {
  GET?(req: NextApiRequest, res: NextApiResponse): Promise<void | unknown>;
  POST?(req: NextApiRequest, res: NextApiResponse): Promise<void | unknown>;
  PUT?(req: NextApiRequest, res: NextApiResponse): Promise<void | unknown>;
  DELETE?(req: NextApiRequest, res: NextApiResponse): Promise<void | unknown>;
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
        const session = await getSession({ req });

        if (!session) {
          throw new Error("Unauthorized");
        }
      }

      // Run requestedMethod
      const requestedMethod = methods[req.method as TMethod];
      if (requestedMethod != undefined) {
        const response = await requestedMethod(req, res);
        if (response) {
          res.setHeader("Content-Type", "application/json");
          res.statusCode = 200;
          res.json(response);
        } else {
          res.statusCode = 200;
          res.end("ok");
        }
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
      console.log(error);
    }
  };
}
