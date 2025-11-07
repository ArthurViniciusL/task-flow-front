import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '@/lib/api/mockApi'; // Assuming mockApi will be replaced by a real API
import { toast } from 'sonner';
import { User, RegisterData } from '@/types/auth';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  loading: boolean;
  isSubmitting: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      // In a real application, you would validate the token with the backend
      // and fetch user details. For now, we'll just assume it's valid.
      // And decode the user info from the token or fetch it.
      // For mock, we'll just set a dummy user.
      setIsAuthenticated(true);
      setUser({ id: "mock-user", email: "mock@example.com", role: "collaborator", name: "Mock User" }); // Placeholder user
    }
    setLoading(false);
  }, []);

  const login = async (email: string) => {
    setIsSubmitting(true);
    try {
      const response = await authApi.login(email);
      if (response.success && response.token) {
        localStorage.setItem('authToken', response.token);
        // In a real app, decode token or fetch user details
        setIsAuthenticated(true);
        setUser({ id: "mock-user", email: email, role: "collaborator", name: "Mock User" }); // Placeholder user
        toast.success("Login realizado com sucesso!");
        navigate('/dashboard');
      } else {
        toast.error(response.message || "Falha no login.");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      toast.error("Ocorreu um erro inesperado.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const register = async (data: RegisterData) => {
    setIsSubmitting(true);
    try {
      const response = await authApi.register(data.email);
      if (response.success) {
        toast.success(response.message || "Registro realizado com sucesso!");
        navigate('/login');
      } else {
        toast.error(response.message || "Falha no registro.");
      }
    } catch (error) {
      console.error("Erro ao registrar:", error);
      toast.error("Ocorreu um erro inesperado.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    setUser(null);
    toast.info("Você foi desconectado.");
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, register, logout, loading, isSubmitting }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
