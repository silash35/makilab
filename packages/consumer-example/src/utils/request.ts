export default async function request(URL: string, method: string, body: any, noAlert = false) {
  let res;
  let json;

  try {
    res = await fetch(URL, {
      method,
      headers: { "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : undefined,
    });

    json = await res.json();
  } catch (error) {
    if (!noAlert) {
      alert(`ERRO: ${JSON.stringify(error)}`);
    }
    return "ERROR";
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
