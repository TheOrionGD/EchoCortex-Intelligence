-- ============================================================================
-- Firebase Configuration Table Setup for Supabase
-- ============================================================================
-- 
-- Instructions:
-- 1. Go to your Supabase project at: https://supabase.com
-- 2. Click on "SQL Editor" in the left sidebar
-- 3. Click "+ New Query"
-- 4. Copy and paste ALL the SQL code below
-- 5. Click "Run" button
-- 6. The table will be created and populated with your Firebase config
--
-- ============================================================================

-- Create firebase_config table
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

-- Create index for quick lookups
CREATE INDEX IF NOT EXISTS idx_firebase_config_active 
  ON firebase_config(active);

-- Add table comment
COMMENT ON TABLE firebase_config IS 'Stores Firebase configuration securely in database. Values are retrieved by frontend via /api/config/firebase endpoint.';

-- ============================================================================
-- INSERT YOUR FIREBASE CREDENTIALS HERE
-- ============================================================================
-- Replace the values below with your actual Firebase credentials
-- These values come from your Firebase Console project settings
-- 
-- To find your credentials:
-- 1. Go to Firebase Console: https://console.firebase.google.com
-- 2. Select your project
-- 3. Click Settings (gear icon) > Project Settings
-- 4. Go to "General" tab
-- 5. Scroll down to "Your apps" section
-- 6. Click on your web app to see the config
--
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
  'system_setup',
  'Firebase configuration initialized from .env'
)
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- Verify the configuration was inserted
-- ============================================================================
SELECT * FROM firebase_config WHERE active = true;
