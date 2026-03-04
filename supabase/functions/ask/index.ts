import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const products = [
  { id: 1, name: "ProBook Gaming X15", category: "laptop", price: 1299, tags: ["gaming", "high-performance", "RTX"] },
  { id: 2, name: "EduBook Lite 14", category: "laptop", price: 449, tags: ["budget", "student", "portable"] },
  { id: 3, name: "StudioPods Max", category: "headphones", price: 349, tags: ["premium", "noise-cancelling", "wireless"] },
  { id: 4, name: "FitBand Ultra", category: "wearable", price: 199, tags: ["fitness", "health", "GPS"] },
  { id: 5, name: "CreatorPad Pro 12.9", category: "tablet", price: 899, tags: ["creative", "drawing", "professional"] },
  { id: 6, name: "SoundBar Home 5.1", category: "audio", price: 599, tags: ["home-theater", "surround-sound", "premium"] },
  { id: 7, name: "MechKey 75%", category: "keyboard", price: 149, tags: ["mechanical", "gaming", "wireless"] },
  { id: 8, name: "UltraWork Laptop 16", category: "laptop", price: 1899, tags: ["professional", "workstation", "premium"] },
];

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query } = await req.json();

    if (!query || typeof query !== "string") {
      return new Response(
        JSON.stringify({ error: "Invalid query. Please provide a text query." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return new Response(
        JSON.stringify({ error: "AI service not configured." }),
        { status: 503, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const productContext = products
      .map((p) => `ID:${p.id} "${p.name}" category:${p.category} price:$${p.price} tags:[${p.tags.join(",")}]`)
      .join("\n");

    const systemPrompt = `You are a product recommendation assistant. Given a user query and a product catalog, return a JSON object with:
- "productIds": array of matching product IDs (numbers)
- "summary": a brief 1-2 sentence recommendation explaining why these products match

Product catalog:
${productContext}

IMPORTANT: Return ONLY valid JSON. No markdown, no code blocks. Example: {"productIds":[1,3],"summary":"These products match because..."}`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: query },
        ],
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please add funds." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "AI service temporarily unavailable." }),
        { status: 503, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const aiData = await response.json();
    const content = aiData.choices?.[0]?.message?.content || "";

    // Parse JSON from the LLM response
    let result: { productIds: number[]; summary: string };
    try {
      // Try to extract JSON from potential markdown code blocks
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        result = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("No JSON found in response");
      }
    } catch {
      console.error("Failed to parse LLM response:", content);
      // Fallback: return all products with the raw response as summary
      result = {
        productIds: products.map((p) => p.id),
        summary: content || "Here are all available products.",
      };
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("Ask function error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
