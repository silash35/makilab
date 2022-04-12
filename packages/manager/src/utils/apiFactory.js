import cookie from "cookie";
import Cors from "cors";
import jwt from "jsonwebtoken";

export default function apiFactory(methods, auth, enableCors) {
  return async function API(req, res) {
    if (enableCors === true) {
      await cors(req, res);
    }

    try {
      if (auth === true) {
        // Verify if user is authenticated
        if (!req.headers.cookie) {
          throw { name: "JsonWebTokenError" };
        }
        const cookies = cookie.parse(req.headers.cookie);
        jwt.verify(cookies[process.env.COOKIE_NAME], process.env.PASSWORD);
      }

      // Run requestedMethod
      const requestedMethod = methods[req.method];
      if (requestedMethod != undefined) {
        await requestedMethod(req, res);
      } else {
        res.statusCode = 405;
      }
    } catch (err) {
      if (err.name === "JsonWebTokenError") {
        res.statusCode = 401;
      } else if (err.name === "Not Found") {
        res.statusCode = 404;
      } else {
        res.statusCode = 500;
      }
      res.end(JSON.stringify({ err }));
    }
  };
}

function initMiddleware(middleware) {
  return (req, res) =>
    new Promise((resolve, reject) => {
      middleware(req, res, (result) => {
        if (result instanceof Error) {
          return reject(result);
        }
        return resolve(result);
      });
    });
}

const cors = initMiddleware(
  Cors({
    methods: ["POST"],
  })
);
