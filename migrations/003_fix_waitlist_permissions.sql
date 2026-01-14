-- Ensure the table exists
create table if not exists public."Waitlist" (
  id uuid default gen_random_uuid() primary key,
  full_name text not null,
  email text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public."Waitlist" enable row level security;

-- Drop existing policies to ensure clean state
drop policy if exists "Enable insert for all users" on public."Waitlist";
drop policy if exists "Enable select for service role only" on public."Waitlist";

-- Allow ANYONE (including unauthenticated/anon users) to insert
create policy "Public Insert Policy" 
on public."Waitlist" 
for insert 
to public 
with check (true);

-- Allow Service Role to do everything (select, insert, update, delete)
create policy "Service Role Full Access" 
on public."Waitlist" 
for all 
using (auth.role() = 'service_role');
