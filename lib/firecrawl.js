import Firecrawl from "@mendable/firecrawl-js";

const firecrawl = new Firecrawl({ apiKey: process.env.FIRECRAWL_API_KEY });

export async function scrapeProduct(url) {
  const result = await firecrawl.scrape(url, {
    formats: [
      {
        type: "json",
        prompt:
          "Extract productName, currentPrice (number), currencyCode (USD, EUR, etc) and productImageUrl if available",
        schema: {
          type: "object",
          properties: {
            productName: { type: "string" },
            currentPrice: { type: "number" },
            currencyCode: { type: "string" },
            productImageUrl: { type: "string" },
          },
          required: ["productName", "currentPrice"],
        },
      },
    ],
  });

  const data = result.json;
  if (!data?.productName) throw new Error("No data extracted from URL");
  return data;
}
