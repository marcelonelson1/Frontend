import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Crear el Context
const AuthContext = createContext(null);

// Hook personalizado para usar el contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

// Provider del contexto
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // useEffect para verificar si hay un usuario guardado en localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  // Función de login (simulado - solo verifica que haya datos)
  const login = (email, password) => {
    // Simulación de login - en un proyecto real haría una llamada a una API
    if (email && password) {
      const userData = {
        email,
        name: 'Usuario Demo',
        id: 1
      };

      const token = 'fake-jwt-token-' + Date.now();

      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', token);

      setUser(userData);
      setIsAuthenticated(true);

      return true;
    }
    return false;
  };

  // Función de logout
  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
    navigate('/');
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
