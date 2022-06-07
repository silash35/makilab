import config from "@config";
import type { NextPageContext } from "next";
import { parseCookies } from "nookies";

type Method = "GET" | "POST" | "PUT" | "DELETE";

interface Req {
  url: string;
  method: Method;
  body?: unknown;
  notJson?: boolean;
}

export default async function request(req: Req, ctx?: Pick<NextPageContext, "req">) {
  const { url, method, body } = req;

  let res: undefined | Response;
  let json;

  // Set headers
  const headers: HeadersInit = {};
  if (body && !req.notJson) {
    headers["Content-Type"] = "application/json";
  }
  const token = parseCookies(ctx).token;
  headers.authorization = token;

  // Make request
  try {
    res = await fetch(`${config.BACKEND_URL}${url}`, {
      method,
      headers,
      body: body ? (req.notJson ? (body as BodyInit) : JSON.stringify(body)) : undefined,
    });
    json = await res.json();
  } catch (e) {
    console.log(e);
  }

  if (res?.status !== 200) {
    return { error: getHumanReadableError(res), status: res?.status };
  }

  return { response: json, status: res.status };
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

export const fetcher = async (url: string) => {
  const res = await fetch(`${config.BACKEND_URL}${url}`, {
    method: "GET",
    headers: { authorization: parseCookies().token },
  });

  if (!res.ok || res.status !== 200) {
    throw getHumanReadableError(res);
  }

  return res.json();
};
