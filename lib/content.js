// Single source of truth for all UI copy.
//
// Only describe features that actually exist: this app scrapes a product URL,
// stores its price history, and emails an alert when a tracked price drops.

export const SITE_NAME = "DealDrop";

// Empty string means the hero badge is not rendered.
export const HERO_BADGE = "";

export const HERO_TITLE = "Track product prices and get notified on price drops";
export const HERO_SUBTITLE =
  "Save any product link. DealDrop records its price daily and emails you when the price decreases.";

export const INPUT_PLACEHOLDER = "Paste product URL to track";

export const HOW_IT_WORKS_TITLE = "How DealDrop works";
export const HOW_IT_WORKS_SUBTITLE =
  "From a product link to a price-drop email in four steps.";

export const HOW_IT_WORKS_STEPS = [
  {
    title: "Paste a product link",
    description:
      "Sign in with Google and add any product page link. Set a target price if you want one.",
    note: "Link and optional target",
  },
  {
    title: "DealDrop reads the price",
    description:
      "It extracts the product name, current price, currency and image, and stores the first entry in the price history.",
    note: "Powered by Firecrawl",
  },
  {
    title: "Checked every day",
    description:
      "A scheduled job re-checks every tracked product daily at 9:00 AM IST and records the new price whenever it changes.",
    note: "Supabase pg_cron",
  },
  {
    title: "Get an email alert",
    description:
      "With a target price, the email is sent once the price reaches it. Without one, any price drop triggers it.",
    note: "Sent with Resend",
  },
];

export const HOW_IT_WORKS_TOOLS_TITLE = "Built-in tools";

export const HOW_IT_WORKS_TOOLS = [
  {
    title: "Target price",
    description:
      "Set the price you want to pay. You are alerted when it is reached or beaten.",
  },
  {
    title: "Check now",
    description:
      "Re-check a single product on demand, limited to once every 5 minutes per product.",
  },
  {
    title: "Price history",
    description:
      "Every recorded price change is plotted on a chart you can expand on each product card.",
  },
  {
    title: "Shareable page",
    description:
      "Copy a public link to a product's price history. No sign-in is needed to view it.",
  },
];

export const EMPTY_TITLE = "No tracked products";
export const EMPTY_TEXT =
  "Paste a product link above to begin monitoring its price over time.";

export const EMAIL_FOOTER = `You're receiving this email because you're tracking this product with ${SITE_NAME}.`;

