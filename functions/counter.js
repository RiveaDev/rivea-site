export async function onRequest(context) {
  const { env } = context;
  const key = "total";

  let total = await env.COUNTER.get(key);
  total = total ? Number(total) + 1 : 1;

  await env.COUNTER.put(key, total.toString());

  return new Response(
    JSON.stringify({ total }),
    { headers: { "Content-Type": "application/json" } }
  );
}
