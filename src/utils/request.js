export default async function request(URL, method, body) {
  const res = await fetch(URL, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  const json = await res.json();

  if (res.status === 200) {
    return json;
  } else {
    alert(`ERRO: ${res.status}\n${json.error}`);
    return "ERROR";
  }
}
