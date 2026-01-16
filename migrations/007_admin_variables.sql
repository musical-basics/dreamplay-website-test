-- Create admin_variables table for key-value storage
CREATE TABLE IF NOT EXISTS public.admin_variables (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.admin_variables ENABLE ROW LEVEL SECURITY;

-- Allow public read access (for countdowns on public pages)
CREATE POLICY "Allow public read access" ON public.admin_variables
    FOR SELECT TO public
    USING (true);

-- Allow service_role full access (for admin updates)
CREATE POLICY "Allow service_role full access" ON public.admin_variables
    FOR ALL TO service_role
    USING (true)
    WITH CHECK (true);

-- Grant permissions
GRANT SELECT ON public.admin_variables TO anon;
GRANT SELECT ON public.admin_variables TO authenticated;
GRANT ALL ON public.admin_variables TO service_role;

-- Insert default value for countdown
INSERT INTO public.admin_variables (key, value)
VALUES ('countdown_end_date', '2026-01-19T21:00:00-08:00')
ON CONFLICT (key) DO NOTHING;
