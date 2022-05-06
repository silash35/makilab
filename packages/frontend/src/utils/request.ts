import { parseCookies } from "nookies";
import config from "@config";
import type { NextPageContext } from "next";

type Method = "GET" | "POST" | "PUT" | "DELETE";

interface Req {
  url: string;
  method: Method;
  body?: unknown;
}

export const fetcher = (url: string) => {
  return fetch(`${config.BACKEND_URL}${url}`, {
    method: "GET",
    headers: { authorization: parseCookies().token },
  }).then((r) => r.json());
};

export default async function request(
  req: Req,
  alert = true,
  sendToken = true,
  ctx?: Pick<NextPageContext, "req">
) {
  const { url, method, body } = req;
  let res: undefined | Response;
  let json;

  try {
    // Set headers
    const headers: HeadersInit = {};
    if (body) {
      headers["Content-Type"] = "application/json";
    }
    if (sendToken) {
      const token = parseCookies(ctx).token;
      if (token) {
        headers.authorization = token;
      } else {
        throw new Error("No token found");
      }
    }

    // Make request
    res = await fetch(`${config.BACKEND_URL}${url}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });
    json = await res.json();
  } catch (error) {
    if (alert) {
      window.alert(
        `ERRO: ${JSON.stringify(res)}\n${JSON.stringify(json)}\n${JSON.stringify(error)}`
      );
    }
  }
  return { response: json, status: res?.status };
}
