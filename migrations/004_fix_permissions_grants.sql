-- 1. Grant usage on the schema to ensure roles can access it
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;

-- 2. Grant Table Permissions (Crucial step often missed)
-- This gives the actual 'postgres role' permission to access the table
GRANT ALL ON TABLE public."Waitlist" TO anon, authenticated, service_role;

-- 3. Ensure Sequence Permissions (if ID is auto-generated via sequence, though gen_random_uuid() doesn't needed it, good practice)
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated, service_role;

-- 4. Re-affirm RLS Policies (Just to be double sure)
alter table public."Waitlist" enable row level security;

-- Allow public insert
drop policy if exists "Public Insert Policy" on public."Waitlist";
create policy "Public Insert Policy" 
on public."Waitlist" 
for insert 
to public 
with check (true);

-- Allow everything for service role
drop policy if exists "Service Role Full Access" on public."Waitlist";
create policy "Service Role Full Access" 
on public."Waitlist" 
for all 
using (auth.role() = 'service_role');
