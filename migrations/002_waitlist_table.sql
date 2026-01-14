create table if not exists public."Waitlist" (
  id uuid default gen_random_uuid() primary key,
  full_name text not null,
  email text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Add RLS policies if needed, but for now allow public insert to this table since it's a waitlist form
alter table public."Waitlist" enable row level security;

create policy "Enable insert for all users" on public."Waitlist"
  for insert with check (true);

create policy "Enable select for service role only" on public."Waitlist"
  for select using (auth.role() = 'service_role');
