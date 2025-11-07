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
    console.log('AuthContext: AuthProvider mounted');
    const token = localStorage.getItem('authToken');
    if (token) {
      console.log('AuthContext: authToken found in localStorage');
      setIsAuthenticated(true);
      setUser({ id: "mock-user", email: "mock@example.com", role: "collaborator", name: "Mock User" }); // Placeholder user
    } else {
      console.log('AuthContext: no authToken found in localStorage');
    }
    setLoading(false);
    console.log('AuthContext: loading set to false');

    return () => {
      console.log('AuthContext: AuthProvider unmounted');
    };
  }, []);

  const login = async (email: string) => {
    console.log('AuthContext: Attempting login for email:', email);
    setIsSubmitting(true);
    try {
      const response = await authApi.login(email);
      if (response.success && response.token) {
        console.log('AuthContext: Login successful, token received');
        localStorage.setItem('authToken', response.token);
        setIsAuthenticated(true);
        setUser({ id: "mock-user", email: email, role: "collaborator", name: "Mock User" }); // Placeholder user
        toast.success("Login realizado com sucesso!");
        navigate('/dashboard');
      } else {
        console.error('AuthContext: Login failed', response.message);
        toast.error(response.message || "Falha no login.");
      }
    } catch (error) {
      console.error("AuthContext: Error during login:", error);
      toast.error("Ocorreu um erro inesperado.");
    } finally {
      setIsSubmitting(false);
      console.log('AuthContext: Login process finished');
    }
  };

  const register = async (data: RegisterData) => {
    console.log('AuthContext: Attempting registration for data:', data);
    setIsSubmitting(true);
    try {
      const response = await authApi.register(data);
      if (response.success) {
        console.log('AuthContext: Registration successful');
        toast.success(response.message || "Registro realizado com sucesso!");
        navigate('/login');
      } else {
        console.error('AuthContext: Registration failed', response.message);
        toast.error(response.message || "Falha no registro.");
      }
    } catch (error) {
      console.error("AuthContext: Error during registration:", error);
      toast.error("Ocorreu um erro inesperado.");
    } finally {
      setIsSubmitting(false);
      console.log('AuthContext: Registration process finished');
    }
  };

  const logout = () => {
    console.log('AuthContext: User logging out');
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    setUser(null);
    toast.info("Você foi desconectado.");
    navigate('/login');
    console.log('AuthContext: User logged out');
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
