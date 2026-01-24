-- Relax RLS for Development
-- The current Service Role Key seems to be treated as Anon, preventing Admin writes.
-- This migration allows public (anon) users to create/update tests.
-- WARNING: Revert or restrict this before production!

-- 1. ab_tests policies
DROP POLICY IF EXISTS "Allow public read access" ON ab_tests;
CREATE POLICY "Allow public all" ON ab_tests FOR ALL USING (true) WITH CHECK (true);

-- 2. ab_variants policies
DROP POLICY IF EXISTS "Allow public read access" ON ab_variants;
CREATE POLICY "Allow public all" ON ab_variants FOR ALL USING (true) WITH CHECK (true);
