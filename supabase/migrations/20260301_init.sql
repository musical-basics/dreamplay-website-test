-- =============================================
-- DreamPlay Pianos — Local Supabase Schema
-- =============================================

-- 1. admin_variables (key-value config store)
CREATE TABLE IF NOT EXISTS admin_variables (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL DEFAULT '',
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. analytics_logs (event tracking)
CREATE TABLE IF NOT EXISTS analytics_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT now(),
    event_name TEXT NOT NULL,
    path TEXT,
    ip_address TEXT,
    country TEXT,
    city TEXT,
    user_agent TEXT,
    user_id TEXT,
    metadata JSONB
);

CREATE INDEX IF NOT EXISTS idx_analytics_event ON analytics_logs (event_name);
CREATE INDEX IF NOT EXISTS idx_analytics_created ON analytics_logs (created_at);
CREATE INDEX IF NOT EXISTS idx_analytics_ip ON analytics_logs (ip_address);

-- 3. Waitlist (signup collection)
CREATE TABLE IF NOT EXISTS "Waitlist" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Customer (user/subscriber data)
CREATE TABLE IF NOT EXISTS "Customer" (
    id UUID PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    name TEXT DEFAULT '',
    tags TEXT[] DEFAULT '{}',
    "createdAt" TIMESTAMPTZ DEFAULT now()
);

-- 5. contact_submissions
CREATE TABLE IF NOT EXISTS contact_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 6. chat_sessions
CREATE TABLE IF NOT EXISTS chat_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    page_url TEXT,
    ip_address TEXT,
    email TEXT,
    status TEXT DEFAULT 'active',
    message_count INT DEFAULT 0,
    admin_takeover_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 7. chat_messages
CREATE TABLE IF NOT EXISTS chat_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID REFERENCES chat_sessions(id) ON DELETE CASCADE,
    role TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_chat_msg_session ON chat_messages (session_id);

-- 8. ab_tests
CREATE TABLE IF NOT EXISTS ab_tests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    target_path TEXT NOT NULL,
    status TEXT DEFAULT 'active',
    winning_variant_id UUID,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 9. ab_variants
CREATE TABLE IF NOT EXISTS ab_variants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    test_id UUID REFERENCES ab_tests(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    path_rewrite TEXT NOT NULL,
    traffic_percent INT DEFAULT 50,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_ab_variant_test ON ab_variants (test_id);

-- 10. ab_events
CREATE TABLE IF NOT EXISTS ab_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    test_id UUID REFERENCES ab_tests(id) ON DELETE CASCADE,
    variant_id UUID REFERENCES ab_variants(id) ON DELETE CASCADE,
    session_id TEXT,
    event_type TEXT NOT NULL,
    metadata JSONB,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_ab_event_test ON ab_events (test_id);
CREATE INDEX IF NOT EXISTS idx_ab_event_variant ON ab_events (variant_id);

-- =============================================
-- Row Level Security — Allow all for local dev
-- =============================================

ALTER TABLE admin_variables ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Waitlist" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Customer" ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE ab_tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE ab_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE ab_events ENABLE ROW LEVEL SECURITY;

-- Permissive policies for local development
CREATE POLICY "Allow all on admin_variables" ON admin_variables FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on analytics_logs" ON analytics_logs FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on Waitlist" ON "Waitlist" FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on Customer" ON "Customer" FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on contact_submissions" ON contact_submissions FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on chat_sessions" ON chat_sessions FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on chat_messages" ON chat_messages FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on ab_tests" ON ab_tests FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on ab_variants" ON ab_variants FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on ab_events" ON ab_events FOR ALL USING (true) WITH CHECK (true);
