/*
  # Fix Admin Profiles RLS Infinite Recursion
  
  ## Problem
  The RLS policies on admin_profiles were causing infinite recursion because:
  - To INSERT a profile, we check if user is in admin_profiles (circular dependency)
  - To SELECT profiles, we check if user is in admin_profiles (circular dependency)
  
  ## Solution
  1. Drop the problematic INSERT policy for super admins
  2. Simplify SELECT policy to allow authenticated users to read their own profile
  3. Allow service role to bypass RLS for initial admin creation
  4. Manually insert the existing user into admin_profiles as super_admin
  
  ## Changes
  - Drop existing SELECT policy that causes recursion
  - Create simple policy: authenticated users can read their own profile
  - Drop existing INSERT policy
  - Create policy: authenticated users can insert their own profile (for signup)
  - Manually add existing user to admin_profiles
*/

-- Drop problematic policies
DROP POLICY IF EXISTS "Admins can view admin profiles" ON admin_profiles;
DROP POLICY IF EXISTS "Super admins can create admin profiles" ON admin_profiles;

-- Allow users to read their own profile (no recursion)
CREATE POLICY "Users can view own profile"
  ON admin_profiles FOR SELECT
  TO authenticated
  USING (id = auth.uid());

-- Allow users to insert their own profile during signup
CREATE POLICY "Users can create own profile"
  ON admin_profiles FOR INSERT
  TO authenticated
  WITH CHECK (id = auth.uid());

-- Insert the existing user as super_admin
INSERT INTO admin_profiles (id, full_name, role)
VALUES ('92c933ab-e823-44b5-95b6-0091be16813d', 'Tereza Gorgolová', 'super_admin')
ON CONFLICT (id) DO NOTHING;
