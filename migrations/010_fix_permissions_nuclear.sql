-- NUCLEAR OPTION: FIX PERMISSIONS
-- 1. Disable RLS entirely to rule out policy issues
ALTER TABLE ab_tests DISABLE ROW LEVEL SECURITY;
ALTER TABLE ab_variants DISABLE ROW LEVEL SECURITY;
ALTER TABLE ab_events DISABLE ROW LEVEL SECURITY;

-- 2. Explicitly GRANT privileges to all roles (anon, authenticated, service_role)
-- This ensures the basic table access rights are present.
GRANT ALL ON ab_tests TO anon, authenticated, service_role;
GRANT ALL ON ab_variants TO anon, authenticated, service_role;
GRANT ALL ON ab_events TO anon, authenticated, service_role;

-- 3. Grant sequence permissions (just in case)
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated, service_role;
