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

export const FEATURES = [
  {
    title: "Track products by link",
    description: "Submit any product page link to store its name, current price, and thumbnail.",
  },
  {
    title: "Daily price records",
    description:
      "Automated daily checks record price changes and render an interactive history chart.",
  },
  {
    title: "Price drop email notifications",
    description:
      "Receive an email alert whenever a monitored item drops below its previous price.",
  },
];

export const EMPTY_TITLE = "No tracked products";
export const EMPTY_TEXT =
  "Paste a product link above to begin monitoring its price over time.";

export const EMAIL_FOOTER = `You're receiving this email because you're tracking this product with ${SITE_NAME}.`;

