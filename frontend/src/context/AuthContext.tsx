
import React, { createContext, useContext, useState } from 'react';
import { UserProfile } from '../types/user';

interface AuthContextType {
  user: UserProfile | null;
  setUser: (user: UserProfile | null) => void;
  // Added loading and logout properties to match requirements in frontend/src/app/App.tsx
  loading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  // Default loading to false as this is a mock implementation
  const [loading, setLoading] = useState(false);

  // Mock logout functionality to support local user state clearing
  const logout = async () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      setUser, 
      loading, 
      logout 
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
