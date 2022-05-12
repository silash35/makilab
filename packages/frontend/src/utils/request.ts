import config from "@config";
import type { NextPageContext } from "next";
import { parseCookies } from "nookies";

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

export default async function request(req: Req, ctx?: Pick<NextPageContext, "req">) {
  const { url, method, body } = req;

  let res: undefined | Response;
  let json;
  let error;

  try {
    // Set headers
    const headers: HeadersInit = {};
    if (body) {
      headers["Content-Type"] = "application/json";
    }
    const token = parseCookies(ctx).token;
    headers.authorization = token;

    // Make request
    res = await fetch(`${config.BACKEND_URL}${url}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });
    json = await res.json();
  } catch (e) {
    console.log(res);
    console.log(e);
    error = e;
  }
  return { response: json, status: res?.status, error };
}
