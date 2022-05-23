import config from "@config";
import type { NextPageContext } from "next";
import { parseCookies } from "nookies";

type Method = "GET" | "POST" | "PUT" | "DELETE";

interface Req {
  url: string;
  method: Method;
  body?: unknown;
}

export default async function request(req: Req, ctx?: Pick<NextPageContext, "req">) {
  const { url, method, body } = req;

  let res: undefined | Response;
  let json;

  // Set headers
  const headers: HeadersInit = {};
  if (body) {
    headers["Content-Type"] = "application/json";
  }
  const token = parseCookies(ctx).token;
  headers.authorization = token;

  // Make request
  try {
    res = await fetch(`${config.BACKEND_URL}${url}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });
    json = await res.json();
  } catch (e) {
    console.log(e);
  }

  if (res?.status === 200) {
    return { response: json, status: res.status };
  } else {
    return { error: getHumanReadableError(res), status: res?.status };
  }
}

const getHumanReadableError = (res?: Response) => {
  console.log(res);

  if (!res) return "Erro de conexão com o servidor";
  else if (res.status === 400) return "Erro 400: Requisição inválida";
  else if (res.status === 401) return "Erro 401: Usuário não autorizado";
  else if (res.status === 404) return "Erro 404: Serviço não encontrado";
  else if (res.status === 500) return "Erro 500: Erro interno do servidor";
  else return "Erro desconhecido";
};

export const fetcher = (url: string) => {
  return fetch(`${config.BACKEND_URL}${url}`, {
    method: "GET",
    headers: { authorization: parseCookies().token },
  }).then((r) => r.json());
};
