export async function onRequest(context) {
  const { env, request } = context;

  // KV binding adı: COUNTER (dashboard'da eklediğin)
  const key = "total";

  let total = await env.COUNTER.get(key);
  total = total ? Number(total) : 0;

  // POST gelince artır, GET gelince sadece göster
  if (request.method === "POST") {
    total += 1;
    await env.COUNTER.put(key, String(total));
  }

  return new Response(JSON.stringify({ total }), {
    headers: { "Content-Type": "application/json" },
  });
}
