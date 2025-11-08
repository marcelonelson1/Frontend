import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { authService, LoginRequest, RegisterRequest } from '../services/authService';
import toast from 'react-hot-toast';

interface User {
  id: string;
  username: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Verificar si hay una sesión guardada al cargar la app
  useEffect(() => {
    const checkAuth = async () => {
      const storedUser = authService.getStoredUser();
      const token = authService.getToken();

      if (storedUser && token) {
        try {
          // Verificar que el token sea válido
          const currentUser = await authService.getCurrentUser();
          if (currentUser) {
            setUser(currentUser);
          } else {
            // Token inválido, limpiar
            authService.logout();
          }
        } catch (error) {
          // Token expirado o inválido
          authService.logout();
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    setLoading(true);

    try {
      const credentials: LoginRequest = { username, password };
      const response = await authService.login(credentials);

      setUser(response.user);
      setLoading(false);
      toast.success(`¡Bienvenido, ${response.user.username}!`);
      return true;
    } catch (error: any) {
      setLoading(false);
      const errorMessage = error.response?.data?.message || error.message || 'Error al iniciar sesión';
      toast.error(errorMessage);
      return false;
    }
  };

  const register = async (username: string, email: string, password: string): Promise<boolean> => {
    setLoading(true);

    try {
      const data: RegisterRequest = { username, email, password };
      const response = await authService.register(data);

      setUser(response.user);
      setLoading(false);
      toast.success(`¡Cuenta creada exitosamente! Bienvenido, ${response.user.username}!`);
      return true;
    } catch (error: any) {
      setLoading(false);
      const errorMessage = error.response?.data?.message || error.message || 'Error al registrarse';
      toast.error(errorMessage);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    authService.logout();
    toast.success('Sesión cerrada exitosamente');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook para usar el contexto
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
