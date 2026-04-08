
import { useState, useEffect } from 'react';
import { UserProfile } from '../types';

export const useAuth = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check session logic
    setLoading(false);
  }, []);

  return { user, loading, authenticated: !!user };
};
