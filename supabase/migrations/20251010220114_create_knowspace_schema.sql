/*
  # KnowSpace Learning Platform Schema

  ## Overview
  This migration creates the complete database schema for KnowSpace, a Czech learning platform 
  about space for children, including articles, games, and secure admin access.

  ## New Tables

  ### 1. `articles`
  Stores educational articles about space topics
  - `id` (uuid, primary key) - Unique identifier
  - `title` (text) - Article title in Czech
  - `slug` (text, unique) - URL-friendly identifier
  - `content` (text) - Full article content
  - `excerpt` (text) - Short preview text
  - `cover_image` (text) - URL to cover image
  - `reading_time` (integer) - Estimated reading time in minutes
  - `difficulty_level` (text) - Target age group (easy/medium/hard)
  - `published` (boolean) - Publication status
  - `view_count` (integer) - Number of views
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp
  - `created_by` (uuid) - Admin who created the article

  ### 2. `games`
  Stores space simulation games and interactive content
  - `id` (uuid, primary key) - Unique identifier
  - `title` (text) - Game title in Czech
  - `slug` (text, unique) - URL-friendly identifier
  - `description` (text) - Game description
  - `thumbnail` (text) - Game thumbnail URL
  - `game_type` (text) - Type of game (quiz/simulation/puzzle)
  - `difficulty_level` (text) - Difficulty level
  - `game_data` (jsonb) - Game configuration and content
  - `published` (boolean) - Publication status
  - `play_count` (integer) - Number of times played
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp
  - `created_by` (uuid) - Admin who created the game

  ### 3. `admin_profiles`
  Stores additional information about admin users
  - `id` (uuid, primary key, references auth.users) - User ID
  - `full_name` (text) - Admin's full name
  - `role` (text) - Admin role (super_admin/content_editor)
  - `created_at` (timestamptz) - Profile creation timestamp

  ### 4. `article_tags`
  Tags for categorizing articles
  - `id` (uuid, primary key) - Unique identifier
  - `name` (text, unique) - Tag name in Czech
  - `slug` (text, unique) - URL-friendly identifier
  - `created_at` (timestamptz) - Creation timestamp

  ### 5. `article_tag_relations`
  Many-to-many relationship between articles and tags
  - `article_id` (uuid) - References articles
  - `tag_id` (uuid) - References article_tags
  - Primary key on (article_id, tag_id)

  ## Security

  ### Row Level Security (RLS)
  All tables have RLS enabled with the following policies:

  #### Public Access (Unauthenticated Users)
  - Can read published articles and games
  - Can view article tags
  - Cannot modify any data

  #### Admin Access (Authenticated Admins)
  - Can create, read, update articles and games
  - Can manage tags and relationships
  - Full CRUD on their admin profile
  - Super admins can manage other admin profiles

  ## Indexes
  - Added indexes on slug fields for fast lookups
  - Added indexes on published status for filtering
  - Added indexes on created_by for admin queries
*/

-- Create articles table
CREATE TABLE IF NOT EXISTS articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  content text NOT NULL,
  excerpt text NOT NULL,
  cover_image text DEFAULT '',
  reading_time integer DEFAULT 5,
  difficulty_level text DEFAULT 'easy' CHECK (difficulty_level IN ('easy', 'medium', 'hard')),
  published boolean DEFAULT false,
  view_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id)
);

-- Create games table
CREATE TABLE IF NOT EXISTS games (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text NOT NULL,
  thumbnail text DEFAULT '',
  game_type text DEFAULT 'quiz' CHECK (game_type IN ('quiz', 'simulation', 'puzzle', 'memory')),
  difficulty_level text DEFAULT 'easy' CHECK (difficulty_level IN ('easy', 'medium', 'hard')),
  game_data jsonb DEFAULT '{}'::jsonb,
  published boolean DEFAULT false,
  play_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id)
);

-- Create admin_profiles table
CREATE TABLE IF NOT EXISTS admin_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text NOT NULL,
  role text DEFAULT 'content_editor' CHECK (role IN ('super_admin', 'content_editor')),
  created_at timestamptz DEFAULT now()
);

-- Create article_tags table
CREATE TABLE IF NOT EXISTS article_tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  slug text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create article_tag_relations table
CREATE TABLE IF NOT EXISTS article_tag_relations (
  article_id uuid REFERENCES articles(id) ON DELETE CASCADE,
  tag_id uuid REFERENCES article_tags(id) ON DELETE CASCADE,
  PRIMARY KEY (article_id, tag_id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_published ON articles(published);
CREATE INDEX IF NOT EXISTS idx_articles_created_by ON articles(created_by);
CREATE INDEX IF NOT EXISTS idx_games_slug ON games(slug);
CREATE INDEX IF NOT EXISTS idx_games_published ON games(published);
CREATE INDEX IF NOT EXISTS idx_games_created_by ON games(created_by);
CREATE INDEX IF NOT EXISTS idx_article_tags_slug ON article_tags(slug);

-- Enable Row Level Security
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE games ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE article_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE article_tag_relations ENABLE ROW LEVEL SECURITY;

-- RLS Policies for articles

-- Public can read published articles
CREATE POLICY "Anyone can view published articles"
  ON articles FOR SELECT
  USING (published = true);

-- Admins can view all articles
CREATE POLICY "Admins can view all articles"
  ON articles FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE admin_profiles.id = auth.uid()
    )
  );

-- Admins can insert articles
CREATE POLICY "Admins can create articles"
  ON articles FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE admin_profiles.id = auth.uid()
    )
  );

-- Admins can update articles
CREATE POLICY "Admins can update articles"
  ON articles FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE admin_profiles.id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE admin_profiles.id = auth.uid()
    )
  );

-- Admins can delete articles
CREATE POLICY "Admins can delete articles"
  ON articles FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE admin_profiles.id = auth.uid()
    )
  );

-- RLS Policies for games

-- Public can read published games
CREATE POLICY "Anyone can view published games"
  ON games FOR SELECT
  USING (published = true);

-- Admins can view all games
CREATE POLICY "Admins can view all games"
  ON games FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE admin_profiles.id = auth.uid()
    )
  );

-- Admins can insert games
CREATE POLICY "Admins can create games"
  ON games FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE admin_profiles.id = auth.uid()
    )
  );

-- Admins can update games
CREATE POLICY "Admins can update games"
  ON games FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE admin_profiles.id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE admin_profiles.id = auth.uid()
    )
  );

-- Admins can delete games
CREATE POLICY "Admins can delete games"
  ON games FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE admin_profiles.id = auth.uid()
    )
  );

-- RLS Policies for admin_profiles

-- Admins can view all admin profiles
CREATE POLICY "Admins can view admin profiles"
  ON admin_profiles FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_profiles ap
      WHERE ap.id = auth.uid()
    )
  );

-- Only super admins can create new admin profiles
CREATE POLICY "Super admins can create admin profiles"
  ON admin_profiles FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE admin_profiles.id = auth.uid()
      AND admin_profiles.role = 'super_admin'
    )
  );

-- Admins can update their own profile
CREATE POLICY "Admins can update own profile"
  ON admin_profiles FOR UPDATE
  TO authenticated
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

-- Super admins can update any profile
CREATE POLICY "Super admins can update any profile"
  ON admin_profiles FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE admin_profiles.id = auth.uid()
      AND admin_profiles.role = 'super_admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE admin_profiles.id = auth.uid()
      AND admin_profiles.role = 'super_admin'
    )
  );

-- RLS Policies for article_tags

-- Anyone can view tags
CREATE POLICY "Anyone can view tags"
  ON article_tags FOR SELECT
  USING (true);

-- Admins can create tags
CREATE POLICY "Admins can create tags"
  ON article_tags FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE admin_profiles.id = auth.uid()
    )
  );

-- Admins can update tags
CREATE POLICY "Admins can update tags"
  ON article_tags FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE admin_profiles.id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE admin_profiles.id = auth.uid()
    )
  );

-- Admins can delete tags
CREATE POLICY "Admins can delete tags"
  ON article_tags FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE admin_profiles.id = auth.uid()
    )
  );

-- RLS Policies for article_tag_relations

-- Anyone can view tag relations
CREATE POLICY "Anyone can view article tag relations"
  ON article_tag_relations FOR SELECT
  USING (true);

-- Admins can manage tag relations
CREATE POLICY "Admins can create article tag relations"
  ON article_tag_relations FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE admin_profiles.id = auth.uid()
    )
  );

CREATE POLICY "Admins can delete article tag relations"
  ON article_tag_relations FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE admin_profiles.id = auth.uid()
    )
  );

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
DROP TRIGGER IF EXISTS update_articles_updated_at ON articles;
CREATE TRIGGER update_articles_updated_at
  BEFORE UPDATE ON articles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_games_updated_at ON games;
CREATE TRIGGER update_games_updated_at
  BEFORE UPDATE ON games
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();