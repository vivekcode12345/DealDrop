// Single source of truth for all UI copy.
//
// Only describe features that actually exist: this app scrapes a product URL,
// stores its price history, and emails an alert when a tracked price drops.

export const SITE_NAME = "DealDrop";

// Empty string means the hero badge is not rendered.
export const HERO_BADGE = "";

export const HERO_TITLE = "Keep track of the prices you care about";
export const HERO_SUBTITLE =
  "Track a product's price and get an email when it drops";

export const INPUT_PLACEHOLDER = "Paste a product URL";

export const FEATURES = [
  {
    title: "Track a product",
    description: "Paste a product link and we save its name, price and image.",
  },
  {
    title: "Price history",
    description:
      "See how a product's price has changed since you started tracking it.",
  },
  {
    title: "Email alerts",
    description:
      "We email you whenever the price of a product you're tracking drops.",
  },
];

export const EMPTY_TITLE = "No products yet";
export const EMPTY_TEXT =
  "Add your first product above to start tracking its price.";

export const EMAIL_FOOTER = `You're receiving this email because you're tracking this product with ${SITE_NAME}.`;
