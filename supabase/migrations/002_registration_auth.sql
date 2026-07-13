-- Registration, approval workflow, and Strava user binding
-- Run after schema.sql in Supabase SQL editor

ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS birth_date DATE,
  ADD COLUMN IF NOT EXISTS approval_status TEXT NOT NULL DEFAULT 'pending'
    CHECK (approval_status IN ('pending', 'approved', 'rejected')),
  ADD COLUMN IF NOT EXISTS email_type TEXT NOT NULL DEFAULT 'personal'
    CHECK (email_type IN ('corporate', 'personal')),
  ADD COLUMN IF NOT EXISTS is_admin BOOLEAN NOT NULL DEFAULT FALSE;

-- Terminals reference table
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

-- RLS for strava_connections
ALTER TABLE strava_connections ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own strava connection" ON strava_connections;
CREATE POLICY "Users can view own strava connection"
  ON strava_connections FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can manage own strava connection" ON strava_connections;
CREATE POLICY "Users can manage own strava connection"
  ON strava_connections FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Admins can view all profiles and update approval status
DROP POLICY IF EXISTS "Admins can update any profile" ON profiles;
CREATE POLICY "Admins can update any profile"
  ON profiles FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles admin
      WHERE admin.id = auth.uid() AND admin.is_admin = TRUE
    )
  );

DROP POLICY IF EXISTS "Admins can view pending profiles" ON profiles;
CREATE POLICY "Admins can view pending profiles"
  ON profiles FOR SELECT
  USING (
    auth.uid() = id
    OR approval_status = 'approved'
    OR EXISTS (
      SELECT 1 FROM profiles admin
      WHERE admin.id = auth.uid() AND admin.is_admin = TRUE
    )
  );

-- Replace open SELECT policy
DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON profiles;

CREATE INDEX IF NOT EXISTS idx_profiles_approval_status ON profiles(approval_status);

-- After your first admin registers, grant admin rights:
-- UPDATE profiles SET is_admin = TRUE WHERE email = 'your-admin@katoennatie.com';