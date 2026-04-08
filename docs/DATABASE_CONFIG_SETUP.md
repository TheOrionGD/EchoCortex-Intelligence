# Database Configuration Setup Guide

## Overview
All configuration data (Firebase, API keys, etc.) is now stored securely in the PostgreSQL database instead of environment variables. The frontend fetches configuration dynamically from the backend via secure API endpoints.

## Benefits
- ✅ No hardcoded secrets in environment files
- ✅ No dummy/placeholder values in code
- ✅ Centralized configuration management
- ✅ Dynamic configuration updates without redeployment
- ✅ Audit trail of configuration changes
- ✅ Production-ready security posture

## Setup Instructions

### 1. Create Database Table

Run the migration script to create the `firebase_config` table:

```bash
# Using psql
psql -U postgres -d echo < backend/migrations/001_create_firebase_config.sql

# Or manually execute the SQL in your database client:
# See: backend/migrations/001_create_firebase_config.sql
```

### 2. Insert Firebase Configuration

Update the following SQL with your actual Firebase credentials and execute:

```sql
INSERT INTO firebase_config (
  api_key,
  auth_domain,
  project_id,
  storage_bucket,
  messaging_sender_id,
  app_id,
  active,
  notes
) VALUES (
  'AIzaSy_YOUR_ACTUAL_API_KEY_HERE',
  'your-project.firebaseapp.com',
  'your-project-id',
  'your-project.appspot.com',
  '123456789012',
  '1:123456789012:web:abcdef1234567890',
  true,
  'Firebase configuration for Echo application'
);
```

### 3. Start Backend Server

The backend will now serve Firebase configuration via the API:

```bash
cd backend
npm run dev
```

### 4. Frontend Configuration

The frontend automatically fetches configuration on startup:

```typescript
// In services/firebase.ts:
// - Calls GET /api/config/firebase
// - Caches response for 1 hour
// - Initializes Firebase with database config
// - No environment variables needed
```

### 5. Verify Setup

Check that configuration is available:

```bash
# Health check
curl http://localhost:3001/health

# Configuration status
curl http://localhost:3001/api/config/status

# Fetch Firebase config (returns cached value from database)
curl http://localhost:3001/api/config/firebase
```

## API Endpoints

### GET /api/config/firebase
Returns Firebase configuration from database.

**Response:**
```json
{
  "apiKey": "AIzaSy_...",
  "authDomain": "your-project.firebaseapp.com",
  "projectId": "your-project-id",
  "storageBucket": "your-project.appspot.com",
  "messagingSenderId": "123456789012",
  "appId": "1:123456789012:web:..."
}
```

**Headers:**
- `Cache-Control: public, max-age=3600` (1-hour client caching)

---

### PUT /api/config/firebase
Update Firebase configuration in database. **Protected endpoint** - requires admin authentication.

**Request Body:**
```json
{
  "apiKey": "NEW_API_KEY",
  "authDomain": "project.firebaseapp.com",
  "projectId": "project-id",
  "storageBucket": "project.appspot.com",
  "messagingSenderId": "123456789012",
  "appId": "1:123456789012:web:..."
}
```

---

### GET /api/config/status
Check if configuration is available.

**Response:**
```json
{
  "status": "ok",
  "configured": true,
  "message": "Firebase configuration is available"
}
```

## Environment Variables (Optional)

Only the backend API URL is required as an environment variable:

```bash
# Frontend (.env)
VITE_API_URL=http://localhost:3001

# Backend (.env)
DATABASE_URL=postgresql://user:password@localhost:5432/echo
```

## Database Schema

The `firebase_config` table structure:

| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL | Primary key |
| api_key | VARCHAR(500) | Firebase API key |
| auth_domain | VARCHAR(255) | Firebase auth domain |
| project_id | VARCHAR(255) | Firebase project ID |
| storage_bucket | VARCHAR(255) | Firebase storage bucket |
| messaging_sender_id | VARCHAR(255) | Firebase messaging sender ID |
| app_id | VARCHAR(255) | Firebase app ID |
| active | BOOLEAN | Whether this configuration is active |
| created_at | TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp |
| created_by | VARCHAR(255) | User who created record |
| notes | TEXT | Optional notes |

## File Changes Summary

### Frontend
- **services/firebase.ts** - Updated to fetch config from `/api/config/firebase` instead of environment variables
  - Async initialization with promise-based API
  - Automatic caching to prevent repeated requests
  - Error handling with fallback messages
  - Export functions: `getAuthService()`, `getStorageService()`

### Backend
- **backend/src/controllers/config.controller.ts** (NEW) - Configuration endpoints
  - `getFirebaseConfig()` - Retrieve from database
  - `updateFirebaseConfig()` - Update in database
  - `checkConfigStatus()` - Health check

- **backend/src/routes/config.routes.ts** (NEW) - Route definitions
  - GET /api/config/firebase
  - PUT /api/config/firebase
  - GET /api/config/status

- **backend/index.ts** - Updated to register config routes
  - Added import for config routes
  - Registered at `/api/config`

- **backend/migrations/001_create_firebase_config.sql** (NEW) - Database schema
  - Creates `firebase_config` table
  - Adds indexes
  - Includes template data

## Security Considerations

1. **Database Encryption**: Store `firebase_config` table values encrypted at rest if using sensitive data
2. **Authentication**: Add middleware to `/api/config/firebase` PUT endpoint to restrict updates
3. **Audit Logging**: Log all configuration changes with timestamps and user information
4. **Credentials Rotation**: Update credentials in database without touching code
5. **HTTPS**: Always use HTTPS in production for /api/config/firebase calls

## Troubleshooting

### "Failed to fetch Firebase config"
- Verify backend is running: `curl http://localhost:3001/health`
- Check database connectivity: `npm run dev` in backend directory
- Verify `firebase_config` table exists: Run migration script

### "Firebase configuration not found in database"
- Insert Firebase credentials using the SQL template above
- Verify `active = true` in the database record

### Configuration not updating on frontend
- Frontend caches config for 1 hour
- Clear browser cache or wait for cache expiration
- Restart frontend dev server to clear memory cache

## Next Steps

1. ✅ Run migration: `psql -U postgres -d echo < backend/migrations/001_create_firebase_config.sql`
2. ✅ Insert Firebase credentials into database
3. ✅ Start backend: `npm run dev` in backend directory
4. ✅ Start frontend: `npm run dev` in root directory
5. ✅ Verify config loads: Open browser console and check for Firebase initialization logs
