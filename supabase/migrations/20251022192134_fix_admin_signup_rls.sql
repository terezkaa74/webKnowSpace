/*
  # Fix Admin Signup RLS Policy

  1. Changes
    - Add policy to allow users to create their own admin profile during signup
    - This allows the first admin to sign up without requiring an existing super_admin
  
  2. Security
    - Users can only insert a row with their own user ID
    - Prevents users from creating profiles for other users
*/

-- Drop existing restrictive INSERT policy
DROP POLICY IF EXISTS "Super admins can create admin profiles" ON admin_profiles;

-- Create new policy that allows users to create their own profile
CREATE POLICY "Users can create own admin profile"
  ON admin_profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Keep the super admin policy for creating other admin profiles
CREATE POLICY "Super admins can create any admin profile"
  ON admin_profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE id = auth.uid() AND role = 'super_admin'
    )
  );
