import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile } from '../types';
import { mongoDB } from '../services/mongodbAuthService';

interface AuthContextType {
  user: UserProfile | null;
  setUser: (user: UserProfile | null) => void;
  firebaseUser: any | null; // Kept for backward compatibility
  loading: boolean;
  logout: () => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginWithEmail: (email: string, pass: string) => Promise<void>;
  signUpWithEmail: (email: string, pass: string, name: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialize and check for existing active MongoDB sessions
  useEffect(() => {
    const checkActiveSession = () => {
      try {
        const cachedSession = localStorage.getItem('mongodb_active_session');
        if (cachedSession) {
          setUserProfile(JSON.parse(cachedSession));
        }
      } catch (err) {
        console.error("Failed to load MongoDB active session:", err);
      } finally {
        setLoading(false);
      }
    };

    checkActiveSession();
  }, []);

  const loginWithEmail = async (email: string, pass: string) => {
    setLoading(true);
    try {
      const dbUser = await mongoDB.findUserByEmailAndAuth(email, pass);
      
      const activeProfile: UserProfile = {
        id: dbUser._id,
        name: dbUser.name,
        email: dbUser.email,
        role: dbUser.role as "admin" | "member" | "viewer",
        avatar: dbUser.avatar
      };

      setUserProfile(activeProfile);
      localStorage.setItem('mongodb_active_session', JSON.stringify(activeProfile));
    } finally {
      setLoading(false);
    }
  };

  const signUpWithEmail = async (email: string, pass: string, name: string) => {
    setLoading(true);
    try {
      const newDbUser = await mongoDB.createUser(name, email, pass);
      const activeProfile: UserProfile = {
        id: newDbUser._id,
        name: newDbUser.name,
        email: newDbUser.email,
        role: newDbUser.role as "admin" | "member" | "viewer",
        avatar: newDbUser.avatar
      };

      setUserProfile(activeProfile);
      localStorage.setItem('mongodb_active_session', JSON.stringify(activeProfile));
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    throw new Error("OAuth Google login is currently disabled. Please authenticate securely via MongoDB Credentials.");
  };

  const logout = async () => {
    setUserProfile(null);
    localStorage.removeItem('mongodb_active_session');
  };

  return (
    <AuthContext.Provider value={{ 
      user: userProfile, 
      setUser: setUserProfile,
      firebaseUser: null, // Always null in MongoDB mode
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
export default AuthContext;
