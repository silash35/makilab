type Method = "GET" | "POST" | "PUT" | "DELETE";

export default async function request(
  URL: string,
  method: Method,
  body?: unknown,
  noAlert = false
) {
  let res: Response | undefined = undefined;
  let json;

  try {
    res = await fetch(URL, {
      method,
      headers: { "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : undefined,
    });

    json = await res.json();

    if (res.ok) {
      return json;
    } else {
      throw new Error("Request failed");
    }
  } catch (error) {
    if (!noAlert) {
      alert(`ERRO: ${JSON.stringify(res)}\n${JSON.stringify(json)}\n${JSON.stringify(error)}`);
    }
    return "ERROR";
  }
}
