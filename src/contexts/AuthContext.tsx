'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@/types';
import { loginUser, registerUser } from '@/lib/api';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: { full_name: string; email: string; phone: string; password: string }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('wecar_token');
    const storedUser = localStorage.getItem('wecar_user');
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
      // Ensure cookie is in sync with localStorage (e.g. after page refresh)
      document.cookie = `wecar_token=${storedToken}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
    }
    setIsLoading(false);
  }, []);

  const setAuth = (u: User, t: string) => {
    setUser(u);
    setToken(t);
    localStorage.setItem('wecar_token', t);
    localStorage.setItem('wecar_user', JSON.stringify(u));
    // Also set cookie so middleware can protect routes
    document.cookie = `wecar_token=${t}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
  };

  const login = async (email: string, password: string) => {
    const { user: u, token: t } = await loginUser(email, password);
    setAuth(u, t);
  };

  const register = async (data: { full_name: string; email: string; phone: string; password: string }) => {
    const { user: u, token: t } = await registerUser(data);
    setAuth(u, t);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('wecar_token');
    localStorage.removeItem('wecar_user');
    // Clear the auth cookie
    document.cookie = 'wecar_token=; path=/; max-age=0; SameSite=Lax';
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
