/*
  # Add Regular Users and Reading Progress Tracking
  
  ## Overview
  Adds support for regular (non-admin) users who can register and track their reading progress.
  
  ## New Tables
  
  ### 1. `user_profiles`
  Stores information about regular users
  - `id` (uuid, primary key, references auth.users) - User ID
  - `full_name` (text) - User's full name
  - `created_at` (timestamptz) - Profile creation timestamp
  
  ### 2. `reading_progress`
  Tracks which articles users have read
  - `id` (uuid, primary key) - Unique identifier
  - `user_id` (uuid) - References user_profiles
  - `article_id` (uuid) - References articles
  - `completed` (boolean) - Whether article was fully read
  - `completed_at` (timestamptz) - When the article was completed
  - `created_at` (timestamptz) - When user started reading
  - Unique constraint on (user_id, article_id)
  
  ## Security
  
  ### Row Level Security
  
  #### user_profiles
  - Users can read and update their own profile
  - Users can create their own profile during registration
  - Admins can view all user profiles
  
  #### reading_progress
  - Users can only see and manage their own reading progress
  - Users can insert and update their own progress
  - Admins cannot see user progress (privacy)
  
  ## Indexes
  - Added index on user_id for fast progress lookups
  - Added index on article_id for analytics
*/

-- Create user_profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create reading_progress table
CREATE TABLE IF NOT EXISTS reading_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  article_id uuid NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
  completed boolean DEFAULT false,
  completed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, article_id)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_reading_progress_user_id ON reading_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_reading_progress_article_id ON reading_progress(article_id);

-- Enable RLS
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE reading_progress ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_profiles

-- Users can view their own profile
CREATE POLICY "Users can view own profile"
  ON user_profiles FOR SELECT
  TO authenticated
  USING (id = auth.uid());

-- Users can create their own profile
CREATE POLICY "Users can create own profile"
  ON user_profiles FOR INSERT
  TO authenticated
  WITH CHECK (id = auth.uid());

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON user_profiles FOR UPDATE
  TO authenticated
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

-- Admins can view all user profiles
CREATE POLICY "Admins can view all user profiles"
  ON user_profiles FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE admin_profiles.id = auth.uid()
    )
  );

-- RLS Policies for reading_progress

-- Users can view their own reading progress
CREATE POLICY "Users can view own progress"
  ON reading_progress FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- Users can create their own reading progress
CREATE POLICY "Users can create own progress"
  ON reading_progress FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Users can update their own reading progress
CREATE POLICY "Users can update own progress"
  ON reading_progress FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Users can delete their own reading progress
CREATE POLICY "Users can delete own progress"
  ON reading_progress FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());