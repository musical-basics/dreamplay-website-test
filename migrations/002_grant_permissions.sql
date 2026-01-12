-- Grant usage on the public schema (fixes "permission denied for schema public")
GRANT USAGE ON SCHEMA public TO service_role;

-- Grant full access to all existing tables (fixes permission issues on "Customer" table)
GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;

-- Ensure service_role can use sequences (for IDs, if any)
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO service_role;

-- Explicitly grant specific access to Customer table just in case
GRANT ALL ON TABLE public."Customer" TO service_role;

-- Allow service_role to execute functions (optional but good practice)
GRANT ALL ON ALL ROUTINES IN SCHEMA public TO service_role;
