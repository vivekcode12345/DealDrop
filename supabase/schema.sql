-- DealDrop database schema
-- Run this in the Supabase SQL Editor to set up tables, RLS policies, and the pg_cron schedule.

-- Tables --

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  url text not null,
  name text not null,
  current_price numeric not null,
  currency text not null,
  image_url text,
  target_price numeric,
  created_at timestamptz not null default now(),
  updated_at timestamp not null default now()
);

create table if not exists price_history (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products(id) on delete cascade,
  price numeric not null,
  currency text not null,
  checked_at timestamp not null default now()
);

-- Row Level Security --

alter table products enable row level security;
alter table price_history enable row level security;

create policy "Users can view their own products"
on products for select
using (auth.uid() = user_id);

create policy "Users can insert their own products"
on products for insert
with check (auth.uid() = user_id);

create policy "Users can update their own products"
on products for update
using (auth.uid() = user_id);

create policy "Users can delete their own products"
on products for delete
using (auth.uid() = user_id);

create policy "Users can view price history  for their product"
on price_history for select
using (
  exists (
    select 1 from products
    where products.id = price_history.product_id
    and products.user_id = auth.uid()
  )
);

create policy "Users can insert price history for their products"
on price_history for insert
with check (
  exists (
    select 1 from products
    where products.id = price_history.product_id
    and products.user_id = auth.uid()
  )
);

-- Daily price check cron (Supabase pg_cron + pg_net) --

create extension if not exists pg_cron;
create extension if not exists pg_net;

-- Replace <YOUR_DEPLOYED_URL> and <YOUR_CRON_SECRET> before running.
-- select cron.schedule(
--   'daily-price-check',
--   '30 3 * * *', -- 9:00 AM IST
--   $$
--   select net.http_post(
--     url := 'https://<YOUR_DEPLOYED_URL>/api/cron/check_prices',
--     headers := jsonb_build_object(
--       'Authorization', 'Bearer <YOUR_CRON_SECRET>',
--       'Content-Type', 'application/json'
--     ),
--     body := '{}'::jsonb
--   ) as request_id;
--   $$
-- );

