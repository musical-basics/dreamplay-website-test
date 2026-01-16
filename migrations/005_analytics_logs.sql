-- Create analytics_logs table
CREATE TABLE IF NOT EXISTS public.analytics_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    event_name TEXT NOT NULL,
    path TEXT NOT NULL,
    ip_address TEXT,
    user_agent TEXT,
    user_id TEXT,
    metadata JSONB
);

-- Add index for faster querying by time
CREATE INDEX IF NOT EXISTS idx_analytics_logs_created_at ON public.analytics_logs(created_at DESC);

-- Grant permissions (adjust based on your roles, usually service_role needs full access, anon might need insert)
GRANT INSERT ON public.analytics_logs TO anon;
GRANT INSERT ON public.analytics_logs TO authenticated;
GRANT SELECT ON public.analytics_logs TO service_role;
