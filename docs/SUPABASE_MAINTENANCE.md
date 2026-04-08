# Supabase Maintenance & Database Connectivity Guide

## Current Situation
Supabase is performing scheduled maintenance on backup infrastructure which involves:
- Postgres restarts (a few seconds downtime)
- Connection pool disconnections
- Region-specific issues (EU-west-1)

## What We've Implemented

### 1. Automatic Connection Retry Logic
**File:** `backend/config/database.ts`
- Attempts connection 3 times with 2-second delays
- Better connection pool configuration
- Error handling for maintenance periods

### 2. Query Retry Logic
**File:** `backend/src/controllers/config.controller.ts`
- Automatically retries failed queries
- Detects connection errors (ECONNREFUSED, ETIMEDOUT, etc.)
- Retries with 1-second delays

### 3. Graceful Error Handling
- Returns helpful error messages when database is unavailable
- Continues operating even during maintenance windows
- Provides status endpoint to check configuration availability

## How to Monitor

### Check Database Status
```
curl http://localhost:3001/api/config/status
```

**Healthy Response:**
```json
{
  "status": "ok",
  "configured": true,
  "message": "Firebase configuration is available"
}
```

**During Maintenance:**
```json
{
  "status": "error",
  "message": "Failed to check configuration status"
}
```

### Check Backend Health
```
curl http://localhost:3001/health
```

### Monitor Supabase Status
Visit: https://status.supabase.com

## Timeline

### Completed
- ✅ Backup method upgrade across the fleet
- ✅ Postgres restarts completed (minimal downtime)
- ✅ Connection resilience implemented

### What to Expect
- EU-west-1 region: Investigation ongoing (may affect new instances)
- Existing projects: Unaffected after restarts
- Database: Should be fully operational again

## Best Practices Applied

1. **Connection Pooling** - Configured max 10 connections with 30s idle timeout
2. **Automatic Retries** - Up to 2 retries with exponential backoff
3. **Error Detection** - Identifies retryable vs permanent errors
4. **Logging** - Detailed logs of connection attempts and failures
5. **Graceful Degradation** - System continues operating during maintenance

## Next Steps

1. **Wait for Supabase Maintenance to Complete**
   - Estimated completion: Early Feb 2026
   - Monitor status.supabase.com for updates

2. **Run the Supabase Setup Script**
   - Once database is fully operational
   - Create firebase_config table
   - Insert your Firebase credentials
   - See: SUPABASE_SETUP.sql

3. **Verify Configuration**
   ```
   curl http://localhost:3001/api/config/firebase
   ```

## Troubleshooting

### Still Getting Connection Errors?
```bash
# 1. Check database URL
echo $DATABASE_URL

# 2. Verify Supabase is up
# Visit: https://status.supabase.com

# 3. Restart backend
# Stop backend, wait 10s, restart
# npm run dev in backend directory

# 4. Check backend logs
# Look for [DB] messages
```

### Table Doesn't Exist?
This is expected during maintenance. Once Supabase is operational:
1. Open Supabase SQL Editor
2. Run the SUPABASE_SETUP.sql script
3. Verify with status endpoint

### Can't Connect to Supabase?
- EU-west-1 region has known issues
- Consider migrating to another region if critical
- Monitor https://status.supabase.com for updates

## Connection Architecture

```
Frontend (3000)
    ↓
    Backend (3001)
        ↓
    Connection Pool (pg)
        ↓
    Database Retry Logic (2 retries)
        ↓
    Supabase PostgreSQL (with maintenance safeguards)
```

---

**Last Updated:** 2026-01-28
**Status:** Monitoring ongoing maintenance
**Next Update:** Once Supabase maintenance completes
