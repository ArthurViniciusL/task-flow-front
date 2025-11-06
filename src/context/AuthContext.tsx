import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false); // TODO: Implement actual auth check

  const login = (token: string) => {
    // TODO: Store token (e.g., localStorage) and set isAuthenticated to true
    console.log('User logged in with token:', token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    // TODO: Remove token from storage and set isAuthenticated to false
    console.log('User logged out');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
