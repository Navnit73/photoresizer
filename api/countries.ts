// Node.js runtime required for direct IP access (Edge runtime blocks direct IP connections)

export default async function handler(req: Request) {
  if (req.method !== "GET" && req.method !== "OPTIONS") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  // Handle CORS preflight request
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  const apiBaseUrl = process.env.PASSPORT_API_URL || "http://51.21.152.238";

  try {
    const response = await fetch(`${apiBaseUrl}/countries`, {
      headers: {
        accept: "application/json",
      },
    });

    if (!response.ok) {
      return new Response(
        JSON.stringify({ error: `Failed to fetch countries: ${response.status} ${response.statusText}` }),
        {
          status: response.status,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=600",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error: any) {
    console.error("Error fetching external countries in proxy:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Failed to fetch countries from external API" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
}
