export const config = {
  runtime: "edge",
};

export default async function handler(req: Request) {
  if (req.method !== "POST" && req.method !== "OPTIONS") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  // Handle CORS preflight request
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, X-API-Key",
      },
    });
  }

  const apiBaseUrl = process.env.PASSPORT_API_URL || "http://51.21.152.238";
  const apiKey = process.env.PASSPORT_API_KEY || "sjdfhgdjghudb-fgdfgd-dfg-dfgd434reermndfvdfjdfgdfhjdfhvdfv";

  try {
    const contentType = req.headers.get("content-type") || "";
    if (!contentType.includes("multipart/form-data")) {
      return new Response(
        JSON.stringify({ error: "Invalid Content-Type. Must be multipart/form-data." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
        }
      );
    }

    const formData = await req.formData();
    const image = formData.get("image");
    const countryCode = formData.get("country_code");
    const documentType = formData.get("document_type") || "passport";

    if (!image || !(image instanceof Blob)) {
      return new Response(
        JSON.stringify({ error: "Missing or invalid image file. Must upload an image." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
        }
      );
    }

    if (!countryCode || typeof countryCode !== "string") {
      return new Response(
        JSON.stringify({ error: "Missing or invalid country_code." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
        }
      );
    }

    // Reconstruct FormData for downstream API call
    const downstreamFormData = new FormData();
    downstreamFormData.append("image", image);
    downstreamFormData.append("country_code", countryCode);
    downstreamFormData.append("document_type", documentType);

    // Forward any extra fields (such as coordinates, dimensions presets)
    for (const [key, value] of formData.entries()) {
      if (key !== "image" && key !== "country_code" && key !== "document_type") {
        downstreamFormData.append(key, value);
      }
    }

    const headers: Record<string, string> = {
      accept: "application/json",
    };

    if (apiKey) {
      headers["X-API-Key"] = apiKey;
    }

    const response = await fetch(`${apiBaseUrl}/process`, {
      method: "POST",
      headers,
      body: downstreamFormData,
    });

    const responseText = await response.text();

    if (!response.ok) {
      let errorMessage = responseText;
      try {
        const errorJson = JSON.parse(responseText);
        errorMessage = errorJson.detail || errorJson.error || responseText;
      } catch (e) {
        // use raw text
      }
      return new Response(
        JSON.stringify({ error: errorMessage }),
        {
          status: response.status,
          headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
        }
      );
    }

    return new Response(responseText, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error: any) {
    console.error("Error in api/process proxy function:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Failed to process photo on the server" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      }
    );
  }
}
