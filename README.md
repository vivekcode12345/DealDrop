# DealDrop

Keep track of the prices you care about — track a product's price and get an email when it drops.

---

## Features

- **Product Tracking by URL**: Paste any product URL to extract its title, current price, currency, and product image via Firecrawl v4.
- **Price History & Charting**: Every price check is stored in PostgreSQL and rendered on an interactive trend chart using Recharts.
- **Automated Price Checks**: Daily cron job pings `/api/cron/check_prices` to re-scrape tracked products in controlled batches of 3.
- **Email Price Drop Alerts**: Automatic email notifications dispatched via Resend whenever a tracked product's price decreases.
- **Authentication**: User sign-in powered by Supabase Auth with Google OAuth.
- **Data Privacy & Row Level Security**: Supabase RLS policies guarantee users can only view, track, and delete their own products and price records.

---

## Tech Stack

- **Next.js 16 (App Router)**: Core full-stack web framework utilizing Server Actions, Route Handlers, and React 19.
- **Supabase**: Managed Postgres database, OAuth authentication, Row Level Security (RLS), and database automation (`pg_cron` + `pg_net`).
- **Firecrawl v4 SDK (`@mendable/firecrawl-js`)**: Web scraping engine with structured JSON extraction for product metadata.
- **Resend**: Transactional email API for delivering formatted price drop alert emails.
- **Tailwind CSS v4 + Base UI**: Styling and accessible primitives built with shadcn "base-nova" UI architecture and Lucide icons.

---

## Architecture Note

Price monitoring operates asynchronously and independently of user browser sessions. Rather than relying on client-side polling or long-lived server listeners, price checks are triggered automatically by Supabase's `pg_cron` extension. At scheduled intervals, `pg_net` issues a secure `POST` request to the Next.js API route (`/api/cron/check_prices`) authenticated via a `Bearer` secret token (`CRON_SECRET`). 

The endpoint processes products in batches of 3 using `Promise.allSettled`, commits updated prices to the database, logs new records in `price_history`, and fires price drop notification emails through Resend if a reduction is detected.

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/vivekcode12345/DealDrop.git
cd DealDrop
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy the example environment file and populate the required keys:

```bash
cp .env.example .env.local
```

### 4. Set up the database schema

Run the SQL script located at [`supabase/schema.sql`](supabase/schema.sql) in your Supabase SQL Editor to create the `products` and `price_history` tables, indexes, and Row Level Security policies.

### 5. Enable extensions and schedule the cron job

In your Supabase project dashboard:
1. Enable the `pg_cron` and `pg_net` extensions under **Database > Extensions**.
2. Run the scheduling script from [`supabase/schema.sql`](supabase/schema.sql), updating your deployed URL and `CRON_SECRET`:

```sql
select cron.schedule(
  'daily-price-check',
  '30 3 * * *', -- 9:00 AM IST
  $$
  select net.http_post(
    url := 'https://<YOUR_DEPLOYED_URL>/api/cron/check_prices',
    headers := jsonb_build_object(
      'Authorization', 'Bearer <YOUR_CRON_SECRET>',
      'Content-Type', 'application/json'
    ),
    body := '{}'::jsonb
  ) as request_id;
  $$
);
```

### 6. Run the local development server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## Environment Variables

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Public API URL of your Supabase project instance |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Public client publishable API key for Supabase client initialization |
| `SUPABASE_SERVICE_ROLE_KEY` | Elevated service-role key for backend operations and bypassing RLS in the cron job |
| `FIRECRAWL_API_KEY` | API authentication key for Firecrawl v4 scraping service |
| `RESEND_API_KEY` | API authentication key for Resend email service |
| `RESEND_FROM_EMAIL` | Verified sender email address used for price drop notification emails |
| `NEXT_PUBLIC_APP_URL` | Public URL of the deployed application (used for email deep-links) |
| `CRON_SECRET` | Secret bearer token required to authorize incoming requests to `/api/cron/check_prices` |

---

## Author

Built by **[Vivek Verma](https://github.com/vivekcode12345)**

