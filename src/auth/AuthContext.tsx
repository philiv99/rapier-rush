import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode, ReactElement } from 'react';
import type { User } from '../types/auth';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (creds: { username: string; email: string; displayName: string; password: string }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }): ReactElement {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load user from localStorage
    const stored = localStorage.getItem('rapier-rush:user');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem('rapier-rush:user');
      }
    }
    setIsLoading(false);
  }, []);

  async function login(username: string, _password: string) {
    // Mock implementation for demo
    const mockUser: User = {
      id: 'user-' + Date.now(),
      username,
      email: username + '@example.com',
      displayName: username,
      role: 'PLAYER',
    };
    localStorage.setItem('rapier-rush:user', JSON.stringify(mockUser));
    localStorage.setItem('rapier-rush:userId', mockUser.id);
    setUser(mockUser);
  }

  async function register(creds: { username: string; email: string; displayName: string; password: string }) {
    // Mock implementation for demo
    const mockUser: User = {
      id: 'user-' + Date.now(),
      username: creds.username,
      email: creds.email,
      displayName: creds.displayName,
      role: 'PLAYER',
    };
    localStorage.setItem('rapier-rush:user', JSON.stringify(mockUser));
    localStorage.setItem('rapier-rush:userId', mockUser.id);
    setUser(mockUser);
  }

  function logout() {
    localStorage.removeItem('rapier-rush:user');
    localStorage.removeItem('rapier-rush:userId');
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
