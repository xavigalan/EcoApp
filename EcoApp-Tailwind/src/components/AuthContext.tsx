import React, { createContext, useContext, useState, useEffect } from 'react';

// Define el contexto de autenticación
const AuthContext = createContext<any>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{ id: number; roleId: number } | null>(null);

  useEffect(() => {
    // Simula obtener el usuario autenticado (puedes reemplazarlo con una llamada real a tu backend)
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/users/1/with-role'); // Cambiar por el ID real
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Error fetching user:', error);
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);