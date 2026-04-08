import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  onAuthStateChanged, 
  User, 
  signOut,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  Auth
} from 'firebase/auth';
import { getAuthService, googleProvider } from '../services/firebase.ts';
import { UserProfile } from '../types/user.ts';

interface AuthContextType {
  user: UserProfile | null;
  setUser: (user: UserProfile | null) => void;
  firebaseUser: User | null;
  loading: boolean;
  logout: () => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginWithEmail: (email: string, pass: string) => Promise<void>;
  signUpWithEmail: (email: string, pass: string, name: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [authService, setAuthService] = useState<Auth | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    let unsubscribe: (() => void) | null = null;

    const initAuth = async () => {
      const timeout = setTimeout(() => {
        if (isMounted && loading) {
          console.warn("Auth check timed out. Proceeding to landing page.");
          setLoading(false);
        }
      }, 5000);

      try {
        const authServiceInstance = await getAuthService();
        
        if (!isMounted) return;
        
        setAuthService(authServiceInstance);
        clearTimeout(timeout);

        // Set up auth listener
        unsubscribe = onAuthStateChanged(authServiceInstance, (user) => {
          if (!isMounted) return;
          
          setFirebaseUser(user);
          if (user) {
            setUserProfile({
              id: user.uid,
              name: user.displayName || 'User Node',
              email: user.email || '',
              role: 'admin', 
              avatar: user.displayName?.split(' ').map(n => n[0]).join('') || 'U'
            });
          } else {
            setUserProfile(null);
          }
          setLoading(false);
        }, (error) => {
          if (isMounted) {
            console.error("Auth listener error:", error);
            setAuthError("Failed to initialize authentication");
            setLoading(false);
          }
        });
      } catch (error) {
        if (isMounted) {
          const errorMsg = error instanceof Error ? error.message : 'Unknown error';
          console.error("[Firebase] Auth initialization error:", errorMsg);
          setAuthError("Firebase is not available. Using offline mode.");
          setLoading(false);
        }
      }
    };

    initAuth();

    return () => {
      isMounted = false;
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  const loginWithGoogle = async () => {
    if (!authService) throw new Error("Auth unavailable");
    await signInWithPopup(authService, googleProvider);
  };

  const loginWithEmail = async (email: string, pass: string) => {
    if (!authService) throw new Error("Auth unavailable");
    await signInWithEmailAndPassword(authService, email, pass);
  };

  const signUpWithEmail = async (email: string, pass: string, name: string) => {
    if (!authService) throw new Error("Auth unavailable");
    const cred = await createUserWithEmailAndPassword(authService, email, pass);
    await updateProfile(cred.user, { displayName: name });
  };

  const logout = async () => {
    if (!authService) {
      setUserProfile(null);
      return;
    }
    await signOut(authService);
  };

  return (
    <AuthContext.Provider value={{ 
      user: userProfile, 
      setUser: setUserProfile,
      firebaseUser, 
      loading, 
      logout, 
      loginWithGoogle,
      loginWithEmail,
      signUpWithEmail
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuthContext must be used within AuthProvider");
  return context;
};
