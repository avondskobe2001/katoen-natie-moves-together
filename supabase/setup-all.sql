-- ============================================================
-- Katoen Natie Moves Together — Complete Supabase Setup
-- Paste this entire file into: Supabase Dashboard → SQL Editor → Run
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  avatar_url TEXT,
  department TEXT,
  country TEXT,
  terminal TEXT,
  region TEXT CHECK (region IN ('global', 'europe', 'africa', 'asia', 'americas', 'oceania')),
  birth_date DATE,
  approval_status TEXT NOT NULL DEFAULT 'pending'
    CHECK (approval_status IN ('pending', 'approved', 'rejected')),
  email_type TEXT NOT NULL DEFAULT 'personal'
    CHECK (email_type IN ('corporate', 'personal')),
  is_admin BOOLEAN NOT NULL DEFAULT FALSE,
  total_distance NUMERIC DEFAULT 0,
  total_points INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Challenges
CREATE TABLE IF NOT EXISTS challenges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  sport TEXT CHECK (sport IN ('cycling', 'running', 'walking', 'football', 'general')),
  status TEXT CHECK (status IN ('active', 'upcoming', 'completed')) DEFAULT 'upcoming',
  start_date DATE,
  end_date DATE,
  target_distance NUMERIC,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS challenge_participations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  challenge_id UUID REFERENCES challenges(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  distance_logged NUMERIC DEFAULT 0,
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(challenge_id, user_id)
);

CREATE TABLE IF NOT EXISTS strava_connections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE UNIQUE,
  athlete_id BIGINT NOT NULL,
  access_token TEXT NOT NULL,
  refresh_token TEXT NOT NULL,
  expires_at BIGINT NOT NULL,
  last_sync_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS strava_activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  strava_activity_id BIGINT NOT NULL,
  name TEXT,
  distance_km NUMERIC,
  elevation_gain NUMERIC,
  activity_type TEXT,
  started_at TIMESTAMPTZ,
  synced_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, strava_activity_id)
);

-- Terminals reference
CREATE TABLE IF NOT EXISTS terminals (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  country TEXT NOT NULL,
  region TEXT NOT NULL CHECK (region IN ('global', 'europe', 'africa', 'asia', 'americas', 'oceania')),
  active BOOLEAN NOT NULL DEFAULT TRUE
);

INSERT INTO terminals (id, name, country, region) VALUES
  ('antwerp', 'Antwerp', 'Belgium', 'europe'),
  ('rotterdam', 'Rotterdam', 'Netherlands', 'europe'),
  ('genk', 'Genk', 'Belgium', 'europe'),
  ('luxembourg', 'Luxembourg', 'Luxembourg', 'europe'),
  ('felixstowe', 'Felixstowe', 'United Kingdom', 'europe'),
  ('hamburg', 'Hamburg', 'Germany', 'europe'),
  ('marseille', 'Marseille', 'France', 'europe'),
  ('barcelona', 'Barcelona', 'Spain', 'europe'),
  ('singapore', 'Singapore', 'Singapore', 'asia'),
  ('shanghai', 'Shanghai', 'China', 'asia'),
  ('dubai', 'Dubai', 'United Arab Emirates', 'asia'),
  ('chennai', 'Chennai', 'India', 'asia'),
  ('lagos', 'Lagos', 'Nigeria', 'africa'),
  ('durban', 'Durban', 'South Africa', 'africa'),
  ('santos', 'Santos', 'Brazil', 'americas'),
  ('houston', 'Houston', 'United States', 'americas'),
  ('montreal', 'Montreal', 'Canada', 'americas'),
  ('sydney', 'Sydney', 'Australia', 'oceania')
ON CONFLICT (id) DO NOTHING;

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_email_type TEXT;
  v_approval_status TEXT;
  v_domain TEXT;
BEGIN
  v_domain := lower(split_part(NEW.email, '@', 2));

  IF v_domain IN ('katoennatie.com', 'katoen-natie.com') THEN
    v_email_type := 'corporate';
    v_approval_status := 'approved';
  ELSE
    v_email_type := 'personal';
    v_approval_status := 'pending';
  END IF;

  INSERT INTO public.profiles (
    id, name, email, terminal, country, region, birth_date,
    approval_status, email_type, is_admin
  ) VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'terminal', ''),
    COALESCE(NEW.raw_user_meta_data->>'country', ''),
    COALESCE(NEW.raw_user_meta_data->>'region', 'global'),
    NULLIF(NEW.raw_user_meta_data->>'birth_date', '')::DATE,
    v_approval_status,
    v_email_type,
    FALSE
  );

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE strava_connections ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Admins can update any profile" ON profiles;
DROP POLICY IF EXISTS "Admins can view pending profiles" ON profiles;

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can update any profile"
  ON profiles FOR UPDATE
  USING (EXISTS (SELECT 1 FROM profiles admin WHERE admin.id = auth.uid() AND admin.is_admin = TRUE));

CREATE POLICY "Profile visibility"
  ON profiles FOR SELECT
  USING (
    auth.uid() = id
    OR approval_status = 'approved'
    OR EXISTS (SELECT 1 FROM profiles admin WHERE admin.id = auth.uid() AND admin.is_admin = TRUE)
  );

DROP POLICY IF EXISTS "Users can view own strava connection" ON strava_connections;
DROP POLICY IF EXISTS "Users can manage own strava connection" ON strava_connections;

CREATE POLICY "Users can view own strava connection"
  ON strava_connections FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own strava connection"
  ON strava_connections FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_profiles_approval_status ON profiles(approval_status);
CREATE INDEX IF NOT EXISTS idx_profiles_terminal ON profiles(terminal);

-- Grant admin after first registration:
-- UPDATE profiles SET is_admin = TRUE WHERE email = 'your-admin@katoennatie.com';