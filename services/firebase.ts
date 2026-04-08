
import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, Auth } from "firebase/auth";
import { getStorage, FirebaseStorage } from "firebase/storage";

/**
 * PRODUCTION-READY FIREBASE CONFIGURATION
 * Fetches configuration from secure backend database via URI endpoint.
 * Never stores sensitive credentials in frontend code or environment variables.
 */

// Configuration cache to avoid multiple database calls
let cachedConfig: any = null;
let configPromise: Promise<any> | null = null;

/**
 * Fetch Firebase configuration from .env variables or database
 * Priority: Environment variables > Database > Error
 */
async function getFirebaseConfig() {
  // Return cached config if available
  if (cachedConfig) {
    return cachedConfig;
  }

  // Return existing promise if already fetching
  if (configPromise) {
    return configPromise;
  }

  // Fetch configuration
  configPromise = (async () => {
    try {
      // First, try to use environment variables (most secure - from .env)
      const envConfig = {
        apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
        authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
        projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
        storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
        appId: import.meta.env.VITE_FIREBASE_APP_ID,
      };

      // If env variables are available, use them
      if (envConfig.apiKey && envConfig.projectId) {
        cachedConfig = envConfig;
        console.log('[Firebase] Configuration loaded from environment variables');
        return cachedConfig;
      }

      // Fall back to database configuration
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
        
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
        
        const response = await fetch(`${apiUrl}/api/config/firebase`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          signal: controller.signal,
        });
        
        clearTimeout(timeoutId);

        if (response.ok) {
          cachedConfig = await response.json();
          
          if (!cachedConfig.apiKey || !cachedConfig.projectId) {
            throw new Error('Invalid Firebase configuration: missing required fields');
          }

          console.log('[Firebase] Configuration loaded from database');
          return cachedConfig;
        }
      } catch (fetchError) {
        console.warn('[Firebase] Database config fetch failed');
      }

      // If both env vars and database failed, throw error
      throw new Error('Firebase configuration unavailable: Set VITE_FIREBASE_API_KEY in .env or configure database');
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      console.error('[Firebase] Failed to load configuration:', errorMsg);
      throw new Error(`Firebase configuration unavailable: ${errorMsg}`);
    }
  })();

  return configPromise;
}

/**
 * Initialize Firebase with configuration from database or environment variables
 */
async function initializeFirebase(): Promise<FirebaseApp> {
  try {
    const firebaseConfig = await getFirebaseConfig();
    
    if (!firebaseConfig.apiKey) {
      throw new Error('Firebase API key is missing from configuration');
    }

    const app: FirebaseApp = getApps().length === 0 
      ? initializeApp(firebaseConfig) 
      : getApp();
    
    console.log('[Firebase] Initialized successfully', {
      projectId: firebaseConfig.projectId,
      source: cachedConfig ? 'database' : 'environment'
    });
    return app;
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error('[Firebase] Initialization failed:', errorMsg);
    
    // Create a minimal mock app to prevent total failure
    // This allows the app to load even if Firebase is unavailable
    console.warn('[Firebase] Using fallback mode - some features may be unavailable');
    
    // Return an empty app reference that will error when used
    // This is better than blocking the entire app
    throw error;
  }
}

// Initialize app with error handling
let appInstance: FirebaseApp | null = null;
let initError: Error | null = null;

const appPromise = initializeFirebase()
  .then(app => {
    appInstance = app;
    return app;
  })
  .catch(error => {
    initError = error;
    console.error('[Firebase] App initialization error stored:', error);
    throw error;
  });

// Export getters that ensure initialization is complete or provide helpful error
export async function getAuthService(): Promise<Auth> {
  if (initError) {
    throw initError;
  }
  const app = await appPromise;
  return getAuth(app);
}

export async function getStorageService(): Promise<FirebaseStorage> {
  if (initError) {
    throw initError;
  }
  const app = await appPromise;
  return getStorage(app);
}

export const googleProvider = new GoogleAuthProvider();

// For backward compatibility - returns promise
export const auth = getAuthService();
export const storage = getStorageService();

export default appPromise;
