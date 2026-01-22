-- 1. Tables to store Test Configuration
create table ab_tests (
  id uuid default gen_random_uuid() primary key,
  name text not null, -- e.g. "Customize Page Redesign"
  slug text not null unique, -- e.g. "customize-v2" (used for cookie name)
  target_path text not null, -- e.g. "/checkout-pages/customize"
  status text default 'draft', -- 'active', 'paused', 'completed'
  winning_variant_id uuid, -- If set, middleware forces this variant 100%
  created_at timestamp with time zone default timezone('utc'::text, now())
);

create table ab_variants (
  id uuid default gen_random_uuid() primary key,
  test_id uuid references ab_tests(id) on delete cascade,
  name text not null, -- 'Control' or 'Variant B'
  path_rewrite text not null, -- The actual file path to serve e.g. "/checkout-pages/customize-b"
  traffic_percent int default 50 -- Allows you to ramp up/down traffic
);

-- 2. Table to store Analytics Events
create table ab_events (
  id uuid default gen_random_uuid() primary key,
  test_id uuid references ab_tests(id),
  variant_id uuid references ab_variants(id),
  session_id text not null, -- From cookie
  event_type text not null, -- 'view', 'click_cta', 'bounce', 'time_on_page'
  metadata jsonb, -- Store "time_spent_seconds" here
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- 3. Enable RLS (Optional but recommended, adjust policies as needed)
alter table ab_tests enable row level security;
alter table ab_variants enable row level security;
alter table ab_events enable row level security;

-- Public read access for tests and variants (so middleware/client can fetch)
create policy "Allow public read access" on ab_tests for select using (true);
create policy "Allow public read access" on ab_variants for select using (true);

-- Allow public insert for events (so client can log events)
-- Note: In production you might want to restrict this more or use a service role for insertion via API
create policy "Allow public insert" on ab_events for insert with check (true);
create policy "Allow public read" on ab_events for select using (true);
