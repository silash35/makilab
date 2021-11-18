import cookie from "cookie";
import jwt from "jsonwebtoken";

export default async function clients(req, res) {
  try {
    const cookies = cookie.parse(req.headers.cookie);
    const cookieName = "authorization";
    jwt.verify(cookies?.[cookieName], process.env.PASSWORD);
  } catch (err) {
    res.statusCode = 401;
    res.end(
      JSON.stringify({
        body: { text: "Deu errado vc não tá logado" },
      })
    );
  }

  res.statusCode = 200;
  res.end(
    JSON.stringify({
      body: { text: "Tudo certo parabens" },
    })
  );
}
