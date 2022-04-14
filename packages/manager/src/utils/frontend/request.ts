type Method = "GET" | "POST" | "PUT" | "DELETE";

export default async function request(
  URL: string,
  method: Method,
  body?: unknown,
  noAlert = false
) {
  const res = await fetch(URL, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });

  let json;

  try {
    json = await res.json();
  } catch (error) {
    json = "";
  }

  if (res.status === 200) {
    return json;
  } else {
    if (!noAlert) {
      alert(`ERRO: ${res.status} ${res.statusText}\n${json.error}`);
    }
    return "ERROR";
  }
}
