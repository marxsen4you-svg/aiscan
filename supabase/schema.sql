-- =============================================
-- AIScan Database Schema for Supabase
-- Run this in Supabase SQL Editor
-- =============================================

-- User profiles (synced from Clerk + Stripe)
CREATE TABLE IF NOT EXISTS user_profiles (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clerk_user_id         TEXT UNIQUE NOT NULL,
  email                 TEXT NOT NULL DEFAULT '',
  plan                  TEXT NOT NULL DEFAULT 'free' CHECK (plan IN ('free', 'pro', 'agency')),
  stripe_customer_id    TEXT,
  stripe_subscription_id TEXT,
  subscription_status   TEXT CHECK (subscription_status IN ('active', 'canceled', 'past_due', 'trialing')),
  audits_this_month     INTEGER NOT NULL DEFAULT 0,
  created_at            TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at            TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Audit records (linked to user when signed in)
CREATE TABLE IF NOT EXISTS audit_records (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         TEXT,  -- clerk_user_id (null for anonymous)
  url             TEXT NOT NULL,
  overall_score   INTEGER NOT NULL,
  metrics         JSONB NOT NULL DEFAULT '{}',
  issues          JSONB NOT NULL DEFAULT '[]',
  report_data     JSONB NOT NULL DEFAULT '{}',
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_audit_records_user_id ON audit_records (user_id);
CREATE INDEX IF NOT EXISTS idx_audit_records_created_at ON audit_records (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_user_profiles_clerk_id ON user_profiles (clerk_user_id);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER user_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Row Level Security
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_records ENABLE ROW LEVEL SECURITY;

-- Service role bypasses RLS (used by supabaseAdmin in server code)
CREATE POLICY "service_role_all_user_profiles" ON user_profiles
  FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE POLICY "service_role_all_audit_records" ON audit_records
  FOR ALL TO service_role USING (true) WITH CHECK (true);
