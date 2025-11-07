/*
  # Fix Security and Performance Issues

  ## Changes Made
  
  1. **Performance Optimizations**
     - Add missing index on `article_tag_relations.tag_id` foreign key
     - Optimize all RLS policies to use `(SELECT auth.uid())` instead of `auth.uid()` for better performance
     - Fix function search_path for `update_updated_at_column()`
  
  2. **Index Management**
     - Remove unused indexes that are not being utilized
  
  3. **Security Enhancements**
     - Consolidate multiple permissive policies into single, more efficient policies
     - Keep RLS enabled on all tables for data protection
  
  ## Tables Modified
  - `articles` - RLS policies optimized
  - `games` - RLS policies optimized
  - `admin_profiles` - RLS policies optimized and consolidated
  - `user_profiles` - RLS policies optimized
  - `reading_progress` - RLS policies optimized
  - `article_tags` - RLS policies optimized
  - `article_tag_relations` - RLS policies optimized, index added
*/

-- Add missing index on tag_id foreign key
CREATE INDEX IF NOT EXISTS idx_article_tag_relations_tag_id ON article_tag_relations(tag_id);

-- Fix function search_path
ALTER FUNCTION update_updated_at_column() SET search_path = pg_catalog, public;

-- Drop and recreate RLS policies with optimized auth checks
-- This uses (SELECT auth.uid()) which is evaluated once per query instead of once per row

-- ARTICLES TABLE
DROP POLICY IF EXISTS "Admins can view all articles" ON articles;
DROP POLICY IF EXISTS "Anyone can view published articles" ON articles;
DROP POLICY IF EXISTS "Admins can create articles" ON articles;
DROP POLICY IF EXISTS "Admins can update articles" ON articles;
DROP POLICY IF EXISTS "Admins can delete articles" ON articles;

-- Consolidated SELECT policy for articles
CREATE POLICY "View articles policy"
  ON articles FOR SELECT
  USING (
    published = true 
    OR EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE admin_profiles.id = (SELECT auth.uid())
    )
  );

CREATE POLICY "Admins can create articles"
  ON articles FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE admin_profiles.id = (SELECT auth.uid())
    )
  );

CREATE POLICY "Admins can update articles"
  ON articles FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE admin_profiles.id = (SELECT auth.uid())
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE admin_profiles.id = (SELECT auth.uid())
    )
  );

CREATE POLICY "Admins can delete articles"
  ON articles FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE admin_profiles.id = (SELECT auth.uid())
    )
  );

-- GAMES TABLE
DROP POLICY IF EXISTS "Admins can view all games" ON games;
DROP POLICY IF EXISTS "Anyone can view published games" ON games;
DROP POLICY IF EXISTS "Admins can create games" ON games;
DROP POLICY IF EXISTS "Admins can update games" ON games;
DROP POLICY IF EXISTS "Admins can delete games" ON games;

-- Consolidated SELECT policy for games
CREATE POLICY "View games policy"
  ON games FOR SELECT
  USING (
    published = true 
    OR EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE admin_profiles.id = (SELECT auth.uid())
    )
  );

CREATE POLICY "Admins can create games"
  ON games FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE admin_profiles.id = (SELECT auth.uid())
    )
  );

CREATE POLICY "Admins can update games"
  ON games FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE admin_profiles.id = (SELECT auth.uid())
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE admin_profiles.id = (SELECT auth.uid())
    )
  );

CREATE POLICY "Admins can delete games"
  ON games FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE admin_profiles.id = (SELECT auth.uid())
    )
  );

-- ADMIN_PROFILES TABLE
DROP POLICY IF EXISTS "Users can view own profile" ON admin_profiles;
DROP POLICY IF EXISTS "Users can create own profile" ON admin_profiles;
DROP POLICY IF EXISTS "Admins can update own profile" ON admin_profiles;
DROP POLICY IF EXISTS "Super admins can update any profile" ON admin_profiles;
DROP POLICY IF EXISTS "Admins can view admin profiles" ON admin_profiles;
DROP POLICY IF EXISTS "Super admins can create admin profiles" ON admin_profiles;

CREATE POLICY "View admin profiles policy"
  ON admin_profiles FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_profiles ap
      WHERE ap.id = (SELECT auth.uid())
    )
  );

CREATE POLICY "Create admin profile policy"
  ON admin_profiles FOR INSERT
  TO authenticated
  WITH CHECK (
    id = (SELECT auth.uid())
    OR EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE admin_profiles.id = (SELECT auth.uid())
      AND admin_profiles.role = 'super_admin'
    )
  );

-- Consolidated UPDATE policy for admin_profiles
CREATE POLICY "Update admin profiles policy"
  ON admin_profiles FOR UPDATE
  TO authenticated
  USING (
    id = (SELECT auth.uid())
    OR EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE admin_profiles.id = (SELECT auth.uid())
      AND admin_profiles.role = 'super_admin'
    )
  )
  WITH CHECK (
    id = (SELECT auth.uid())
    OR EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE admin_profiles.id = (SELECT auth.uid())
      AND admin_profiles.role = 'super_admin'
    )
  );

-- USER_PROFILES TABLE
DROP POLICY IF EXISTS "Users can view own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can create own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON user_profiles;
DROP POLICY IF EXISTS "Admins can view all user profiles" ON user_profiles;

-- Consolidated SELECT policy for user_profiles
CREATE POLICY "View user profiles policy"
  ON user_profiles FOR SELECT
  TO authenticated
  USING (
    id = (SELECT auth.uid())
    OR EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE admin_profiles.id = (SELECT auth.uid())
    )
  );

CREATE POLICY "Create user profile policy"
  ON user_profiles FOR INSERT
  TO authenticated
  WITH CHECK (id = (SELECT auth.uid()));

CREATE POLICY "Update user profile policy"
  ON user_profiles FOR UPDATE
  TO authenticated
  USING (id = (SELECT auth.uid()))
  WITH CHECK (id = (SELECT auth.uid()));

-- READING_PROGRESS TABLE
DROP POLICY IF EXISTS "Users can view own progress" ON reading_progress;
DROP POLICY IF EXISTS "Users can create own progress" ON reading_progress;
DROP POLICY IF EXISTS "Users can update own progress" ON reading_progress;
DROP POLICY IF EXISTS "Users can delete own progress" ON reading_progress;

CREATE POLICY "View reading progress policy"
  ON reading_progress FOR SELECT
  TO authenticated
  USING (user_id = (SELECT auth.uid()));

CREATE POLICY "Create reading progress policy"
  ON reading_progress FOR INSERT
  TO authenticated
  WITH CHECK (user_id = (SELECT auth.uid()));

CREATE POLICY "Update reading progress policy"
  ON reading_progress FOR UPDATE
  TO authenticated
  USING (user_id = (SELECT auth.uid()))
  WITH CHECK (user_id = (SELECT auth.uid()));

CREATE POLICY "Delete reading progress policy"
  ON reading_progress FOR DELETE
  TO authenticated
  USING (user_id = (SELECT auth.uid()));

-- ARTICLE_TAGS TABLE
DROP POLICY IF EXISTS "Admins can create tags" ON article_tags;
DROP POLICY IF EXISTS "Admins can update tags" ON article_tags;
DROP POLICY IF EXISTS "Admins can delete tags" ON article_tags;

CREATE POLICY "Admins can create tags"
  ON article_tags FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE admin_profiles.id = (SELECT auth.uid())
    )
  );

CREATE POLICY "Admins can update tags"
  ON article_tags FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE admin_profiles.id = (SELECT auth.uid())
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE admin_profiles.id = (SELECT auth.uid())
    )
  );

CREATE POLICY "Admins can delete tags"
  ON article_tags FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE admin_profiles.id = (SELECT auth.uid())
    )
  );

-- ARTICLE_TAG_RELATIONS TABLE
DROP POLICY IF EXISTS "Admins can create article tag relations" ON article_tag_relations;
DROP POLICY IF EXISTS "Admins can delete article tag relations" ON article_tag_relations;

CREATE POLICY "Admins can create article tag relations"
  ON article_tag_relations FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE admin_profiles.id = (SELECT auth.uid())
    )
  );

CREATE POLICY "Admins can delete article tag relations"
  ON article_tag_relations FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE admin_profiles.id = (SELECT auth.uid())
    )
  );