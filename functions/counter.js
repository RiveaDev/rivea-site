export async function onRequest({ env }) {
  const key = "total";

  let total = await env.COUNTER.get(key);
  total = total ? Number(total) + 1 : 1;

  await env.COUNTER.put(key, total.toString());

  return new Response(
    JSON.stringify({ total }),
    { headers: { "Content-Type": "application/json" } }
  );
}

