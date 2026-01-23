export async function onRequest(context) {
  try {
    const { request, env } = context;

    // KV binding adı: COUNTER
    if (!env || !env.COUNTER) {
      return new Response(
        JSON.stringify({ error: "KV binding (COUNTER) bulunamadı." }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const key = "total";
    const url = new URL(request.url);

    // İstersen sadece /counter'da çalışsın (güvenlik için)
    // Eğer farklı path'lere de düşüyorsa sorun çıkmasın:
    if (!url.pathname.endsWith("/counter")) {
      return new Response("Not Found", { status: 404 });
    }

    // OPTIONS (CORS preflight)
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    // KV'den oku
    let total = await env.COUNTER.get(key);
    total = Number(total || 0);

    // POST ise artır, GET ise sadece göster
    if (request.method === "POST") {
      total += 1;
      await env.COUNTER.put(key, String(total));
    }

    return new Response(JSON.stringify({ total }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: String(err?.message || err) }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
