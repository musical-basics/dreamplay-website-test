-- Enable RLS on the table (in case it wasn't, or to ensure it is)
ALTER TABLE public.analytics_logs ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to insert logs (needed for tracking)
CREATE POLICY "Enable insert for anon" ON public.analytics_logs
    FOR INSERT TO anon
    WITH CHECK (true);

-- Allow authenticated users to insert logs
CREATE POLICY "Enable insert for authenticated" ON public.analytics_logs
    FOR INSERT TO authenticated
    WITH CHECK (true);

-- Allow service_role to read all logs (for dashboard)
CREATE POLICY "Enable read for service_role" ON public.analytics_logs
    FOR SELECT TO service_role
    USING (true);

-- Allow service_role to insert (explicitly, though usually bypassed)
CREATE POLICY "Enable insert for service_role" ON public.analytics_logs
    FOR INSERT TO service_role
    WITH CHECK (true);

-- Ensure grants are correct
GRANT ALL ON public.analytics_logs TO service_role;
GRANT INSERT ON public.analytics_logs TO anon;
GRANT INSERT ON public.analytics_logs TO authenticated;
