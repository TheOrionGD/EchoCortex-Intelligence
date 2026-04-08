/**
 * Database Migration: Create firebase_config table
 *
 * This migration runs automatically when the backend starts.
 * It creates the firebase_config table and populates it with Firebase credentials.
 */

CREATE TABLE IF NOT EXISTS firebase_config (
  id SERIAL PRIMARY KEY,
  api_key VARCHAR(500) NOT NULL,
  auth_domain VARCHAR(255) NOT NULL,
  project_id VARCHAR(255) NOT NULL,
  storage_bucket VARCHAR(255) NOT NULL,
  messaging_sender_id VARCHAR(255) NOT NULL,
  app_id VARCHAR(255) NOT NULL,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by VARCHAR(255),
  notes TEXT
);

-- Index for quick lookups
CREATE INDEX IF NOT EXISTS idx_firebase_config_active
  ON firebase_config(active);

-- Add comment to table
COMMENT ON TABLE firebase_config IS 'Stores Firebase configuration securely in database. Values are retrieved by frontend via /api/config/firebase endpoint.';

-- Insert Firebase configuration
INSERT INTO firebase_config (
  api_key,
  auth_domain,
  project_id,
  storage_bucket,
  messaging_sender_id,
  app_id,
  active,
  created_by,
  notes
) VALUES (
  'AIzaSyAyVDCYVBz6P3MdGkSqbF5KLhQkCQRX200',
  'device-streaming-3888639c.firebaseapp.com',
  'device-streaming-3888639c',
  'device-streaming-3888639c.appspot.com',
  '402414766279',
  '1:402414766279:web:2ea3f7b453f07c81b016e2',
  true,
  'auto_migration',
  'Firebase configuration initialized automatically on backend startup'
) ON CONFLICT (id) DO NOTHING;
