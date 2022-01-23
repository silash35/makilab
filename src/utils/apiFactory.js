import cookie from "cookie";
import jwt from "jsonwebtoken";

export default function apiFactory(methods, auth) {
  return async function API(req, res) {
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
        res.end("Method Not Allowed");
      }
    } catch (err) {
      if (err.name === "JsonWebTokenError") {
        res.statusCode = 401;
        res.end("Unauthorized");
      } else if (err.name === "Not Found") {
        res.statusCode = 404;
        res.end("Not Found");
      } else {
        res.statusCode = 500;
        res.end("Internal Server Error \n" + JSON.stringify({ err }));
      }
    }
  };
}
