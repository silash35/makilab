import cookie from "cookie";
import jwt from "jsonwebtoken";

export default function apiFactory(methods, auth) {
  return async function API(req, res) {
    try {
      if (auth === true) {
        // Verify if user is authenticated
        const cookies = cookie.parse(req.headers.cookie);
        jwt.verify(cookies?.[process.env.COOKIE_NAME], process.env.PASSWORD);
      }
      // Run requestedMethod
      const requestedMethod = methods[req.method];
      if (requestedMethod != undefined) {
        await requestedMethod(req, res);
      } else {
        res.statusCode = 404;
      }
    } catch (err) {
      res.statusCode = 401;
      res.end("Unauthorized");
    }
  };
}
