/*
  # Add language support to articles

  1. Changes
    - Add `language` column to `articles` table with default value 'cs'
    - Add check constraint to ensure language is either 'cs' or 'en'
    - Create index on language column for faster queries

  2. Notes
    - Existing articles will default to Czech ('cs')
    - Future articles must specify language
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'articles' AND column_name = 'language'
  ) THEN
    ALTER TABLE articles ADD COLUMN language text DEFAULT 'cs' NOT NULL;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.constraint_column_usage
    WHERE table_name = 'articles' AND constraint_name = 'articles_language_check'
  ) THEN
    ALTER TABLE articles ADD CONSTRAINT articles_language_check CHECK (language IN ('cs', 'en'));
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_articles_language ON articles(language);