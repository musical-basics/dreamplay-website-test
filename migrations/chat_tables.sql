-- Chat Sessions table
CREATE TABLE IF NOT EXISTS chat_sessions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  email text,
  status text DEFAULT 'active',
  admin_takeover_at timestamptz,
  page_url text,
  ip_address text,
  message_count int DEFAULT 0
);

-- Chat Messages table
CREATE TABLE IF NOT EXISTS chat_messages (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id uuid REFERENCES chat_sessions(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  role text NOT NULL,
  content text NOT NULL
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_chat_sessions_created ON chat_sessions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_chat_messages_session ON chat_messages(session_id, created_at);

-- RLS (enabled but only service_role has access — all queries go through server-side API routes)
ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- Service role full access (the ONLY role that touches these tables)
CREATE POLICY "Service role full access" ON chat_sessions TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON chat_messages TO service_role USING (true) WITH CHECK (true);

-- Grants: only service_role
GRANT ALL ON chat_sessions TO service_role;
GRANT ALL ON chat_messages TO service_role;
